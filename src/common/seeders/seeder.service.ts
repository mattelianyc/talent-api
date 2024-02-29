import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Account } from '../../account/schemas/account.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // Ensure correct model name as string
    @InjectModel('Account') private readonly accountModel: Model<Account> // Ensure correct model name as string
    ) {}
    
  async seed() {
    console.log('tits mcshits');
    try {
      // Clear existing data
      await this.userModel.deleteMany({});
      await this.accountModel.deleteMany({});

      // Seed users
      const users = await this.seedUsers();

      // Seed accounts for each user, including transactions
      await this.seedAccountsAndTransactions(users);
    } catch (error) {
      console.log('err ', error)
      this.logger.error('Error during seeding process:', error.message);
    }
  }

  private async seedUsers() {
    const usersData = [
      { email: 'user1@example.com', password: await bcrypt.hash('password1', 10) },
      { email: 'user2@example.com', password: await bcrypt.hash('password2', 10) },
      { email: 'user3@example.com', password: await bcrypt.hash('password3', 10) },
    ];

    return this.userModel.insertMany(usersData);
  }

  private async seedAccountsAndTransactions(users: any[]) {
    for (const user of users) {
      const accountData = {
        userId: user._id,
        balance: 100.00, // Example balance
        transactions: this.generateTransactions(10), // Generate 10 transactions
      };

      await this.accountModel.create(accountData);
    }
  }

  private generateTransactions(count: number) {
    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        description: `Transaction ${i + 1}`,
        amount: Math.floor(Math.random() * 100) + 1,
        date: new Date(),
      });
    }
    return transactions;
  }
}