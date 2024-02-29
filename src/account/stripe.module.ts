import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Module({
  providers: [StripeService],
  exports: [StripeService] // Export StripeService so it can be used elsewhere
})
export class StripeModule {}
