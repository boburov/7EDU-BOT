import { Test, TestingModule } from '@nestjs/testing';
import { TelegrammService } from './telegramm.service';

describe('TelegrammService', () => {
  let service: TelegrammService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegrammService],
    }).compile();

    service = module.get<TelegrammService>(TelegrammService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
