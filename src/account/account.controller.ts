import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':userId/details')
  async getAccountDetails(@Param('userId') userId: string) {
    const balance = await this.accountService.getAccountBalance(userId);
    const transactions = await this.accountService.getTransactionsByUserId(userId);
    return { balance, transactions };
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId') userId: string) {
    return { balance: await this.accountService.getAccountBalance(userId) };
  }

  @Post(':userId/transactions')
  async addTransaction(
    @Param('userId') userId: string,
    @Body() transactionDto: { description: string; amount: number }
  ) {
    const transaction = await this.accountService.addTransaction(userId, transactionDto.description, transactionDto.amount);
    return { transactionId: transaction._id, status: 'success' };
  }

  @Post(':userId/record-payment')
  async recordPayment(
    @Param('userId') userId: string,
    @Body() body: { paymentIntentId: string; amount: number }
  ) {
    // You might want to add additional logic here to confirm payment with Stripe if needed
    const { paymentIntentId, amount } = body;
    return this.accountService.recordPayment(userId, paymentIntentId, amount);
  }
}
