import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test', {
      apiVersion: '2022-11-15',
    });
  }

  getMessage(): string {
    return 'Payments service';
  }

  async createCharge(
    amount: number,
    source: string,
    currency = 'usd'
  ): Promise<Stripe.Charge> {
    try {
      return await this.stripe.charges.create({ amount, currency, source });
    } catch (error) {
      throw new Error('Payment failed');
    }
  }

  handleWebhook(signature: string, payload: Buffer): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_test'
    );
  }
}
