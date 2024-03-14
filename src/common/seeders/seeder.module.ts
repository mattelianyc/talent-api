// src/common/seeders/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../users/schemas/user.schema';
import { AccountSchema } from '../../account/schemas/account.schema';
// import { TransactionSchema } from '../../account/schemas/account.schema';
// import { SubscriptionTierSchema } from 'src/talent/schemas/subscriptionTier.schema';
import { TalentSchema } from 'src/talent/schemas/talent.schema';
// import { VideoContentSchema } from 'src/talent/schemas/content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    // MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: 'Talent', schema: TalentSchema }]),
    // MongooseModule.forFeature([{ name: 'SubscriptionTier', schema: SubscriptionTierSchema }]),
    // MongooseModule.forFeature([{ name: 'VideoContent', schema: VideoContentSchema }]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
