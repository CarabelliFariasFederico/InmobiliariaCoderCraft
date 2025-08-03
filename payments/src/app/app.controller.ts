import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessage(): string {
    return this.appService.getMessage();
  }

  @Post('charge')
  createCharge(
    @Body('amount') amount: number,
    @Body('source') source: string,
    @Body('currency') currency: string,
  ) {
    return this.appService.createCharge(amount, source, currency);
  }

  @Post('webhook')
  handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() body: any,
  ) {
    const payload = Buffer.from(JSON.stringify(body));
    this.appService.handleWebhook(signature, payload);
    return { received: true };
  }
}
