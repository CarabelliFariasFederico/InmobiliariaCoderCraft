import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly http: HttpService) {}

  @Get('auth')
  async auth() {
    const { data } = await firstValueFrom(this.http.get('http://localhost:3001'));
    return data;
  }

  @Get('properties')
  async properties() {
    const { data } = await firstValueFrom(this.http.get('http://localhost:3002'));
    return data;
  }

  @Get('payments')
  async payments() {
    const { data } = await firstValueFrom(this.http.get('http://localhost:3003'));
    return data;
  }
}
