import { Test, TestingModule } from '@nestjs/testing';
import { RetailersController } from './retailers.controller.js';

describe('RetailersController', () => {
  let controller: RetailersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetailersController],
    }).compile();

    controller = module.get<RetailersController>(RetailersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
