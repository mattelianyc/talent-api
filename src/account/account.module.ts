// src/account/account.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountSchema, TransactionSchema } from './schemas/account.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
