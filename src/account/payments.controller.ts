// payments.controller.ts
import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { StripeService } from './stripe.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(createPaymentIntentDto.amount);
      console.log('Payment Intent with Client Secret and ID:', paymentIntent);
      return paymentIntent; 
    } catch (error) {
      throw new HttpException('Failed to create payment intent', HttpStatus.BAD_REQUEST);
    }
  }
}
