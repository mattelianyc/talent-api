// stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Adjust currency as needed
      });
      return { clientSecret: paymentIntent.client_secret }; // Return the client secret
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }
}
