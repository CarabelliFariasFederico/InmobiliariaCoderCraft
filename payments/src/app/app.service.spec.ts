import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getMessage', () => {
    it('should return "Payments service"', () => {
      expect(service.getMessage()).toEqual('Payments service');
    });
  });

  describe('createCharge', () => {
    it('should create a charge successfully', async () => {
      const stripeMock = {
        charges: {
          create: jest
            .fn()
            .mockResolvedValue({ id: 'ch_1', status: 'succeeded' }),
        },
        webhooks: { constructEvent: jest.fn() },
      } as any;

      (service as any).stripe = stripeMock;

      await expect(
        service.createCharge(1000, 'tok_visa', 'usd')
      ).resolves.toEqual({ id: 'ch_1', status: 'succeeded' });
    });

    it('should throw an error when payment fails', async () => {
      const stripeMock = {
        charges: {
          create: jest
            .fn()
            .mockRejectedValue(new Error('card declined')),
        },
        webhooks: { constructEvent: jest.fn() },
      } as any;

      (service as any).stripe = stripeMock;

      await expect(
        service.createCharge(1000, 'tok_fail', 'usd')
      ).rejects.toThrow('Payment failed');
    });
  });
});
