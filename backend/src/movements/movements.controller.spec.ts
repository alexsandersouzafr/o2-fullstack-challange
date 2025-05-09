import { Test, TestingModule } from '@nestjs/testing';
import { MovementsController } from './movements.controller';

describe('MovementsController', () => {
  let controller: MovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementsController],
    }).compile();

    controller = module.get<MovementsController>(MovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
