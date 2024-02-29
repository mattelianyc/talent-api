import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, Transaction } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>
  ) {}

  async ensureAccount(userId: string): Promise<Account> {
    let account = await this.accountModel.findOne({ userId }).exec();
    if (!account) {
      account = new this.accountModel({ userId, balance: 0 });
      await account.save();
    }
    return account;
  }

  async getAccountBalance(userId: string): Promise<number> {
    const account = await this.ensureAccount(userId);
    return account.balance;
  }

  async addTransaction(userId: string, description: string, amount: number): Promise<Transaction> {
    const account = await this.ensureAccount(userId);
    const transaction = new this.transactionModel({
      accountId: account._id,
      description,
      amount,
      date: new Date(),
    });

    account.balance += amount;
    await account.save();
    return transaction.save();
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    const { transactions } = await this.ensureAccount(userId);
    return transactions;
  }
}
