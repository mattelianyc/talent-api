import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto'; // Assuming you have this DTO
import { StripeService } from './stripe.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    const { amount } = createPaymentIntentDto;
    console.log('am ount  ', amount)
    // Now use the amount to create a payment intent
  }
}
