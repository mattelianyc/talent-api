import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema'; // Adjust the import path as necessary
import { Account } from '../../account/schemas/account.schema'; // Adjust the import path as necessary
import { Talent } from '../../talent/schemas/talent.schema'; // Adjust the import path as necessary
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Account') private accountModel: Model<Account>,
    @InjectModel('Talent') private talentModel: Model<Talent>
  ) {}

  async seed() {
    this.logger.log('Seeding data...');
    try {
      // Clear existing data
      await this.userModel.deleteMany({});
      await this.accountModel.deleteMany({});
      await this.talentModel.deleteMany({});

      // Seed talents and regular users
      const { talentUsers, regularUsers } = await this.seedUsers();

      // Seed accounts for both talent and regular users
      await this.seedAccounts([...talentUsers, ...regularUsers]);

      // Seed talents with subscription tiers and content
      for (const talentUser of talentUsers) {
        await this.seedTalentDetails(talentUser.talentId);
      }
    } catch (error) {
      this.logger.error('Error during seeding process:', error.message);
    }
  }

  private async seedUsers() {
    const hashedPassword = await bcrypt.hash('1', 10);

    // Seed talent users with associated talent profiles
    const talentProfiles = [
      { name: 'Talent A', description: 'Description A', subscriptionTiers: [], content: [] },
      { name: 'Talent B', description: 'Description B', subscriptionTiers: [], content: [] },
    ];
    const talents = await this.talentModel.insertMany(talentProfiles);

    const talentUsersData = talents.map((talent, index) => ({
      email: `t${index}@t.com`,
      password: hashedPassword,
      userType: 'talent',
      talentId: talent._id,
    }));
    const talentUsers = await this.userModel.insertMany(talentUsersData);

    // Seed regular users
    const regularUsersData = [
      { email: 'a', password: hashedPassword, userType: 'regular' },
      { email: 'b', password: hashedPassword, userType: 'regular' },
      { email: 'c', password: hashedPassword, userType: 'regular' },
    ];
    const regularUsers = await this.userModel.insertMany(regularUsersData);

    return { talentUsers, regularUsers };
  }

  private async seedAccounts(users) {
    for (const user of users) {
      await this.accountModel.create({
        userId: user._id,
        balance: user.userType === 'talent' ? 1000 : 100, // Example starting balance
        transactions: [],
        userType: user.userType,
        revenue: user.userType === 'talent' ? 0 : undefined,
        payouts: user.userType === 'talent' ? [] : undefined,
      });
    }
  }

  private async seedTalentDetails(talentId) {
    const subscriptionTiers = [
      { title: 'Basic', price: 5, benefits: ['Access to basic content'] },
      { title: 'Premium', price: 15, benefits: ['Access to all content', 'Exclusive sessions'] },
    ];

    const content = [
      { title: 'Introduction to Talent A', description: 'An introductory video.', url: 'http://example.com/video1', price: 10 },
      { title: 'Advanced Techniques', description: 'Learn advanced techniques.', url: 'http://example.com/video2', price: 20 },
    ];

    await this.talentModel.findByIdAndUpdate(talentId, { $push: { subscriptionTiers: { $each: subscriptionTiers }, content: { $each: content } } });
  }

  // Additional methods for further seeding if necessary
}
