// src/common/seeders/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../users/schemas/user.schema';
import { AccountSchema } from '../../account/schemas/account.schema';
import { TransactionSchema } from '../../account/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
