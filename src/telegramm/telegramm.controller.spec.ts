import { Test, TestingModule } from '@nestjs/testing';
import { TelegrammController } from './telegramm.controller';
import { TelegrammService } from './telegramm.service';

describe('TelegrammController', () => {
  let controller: TelegrammController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegrammController],
      providers: [TelegrammService],
    }).compile();

    controller = module.get<TelegrammController>(TelegrammController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
