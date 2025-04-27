import { Test, TestingModule } from '@nestjs/testing';
import { ContestProblemsController } from './contest-problems.controller';
import { ContestProblemsService } from './contest-problems.service';

describe('ContestProblemsController', () => {
  let controller: ContestProblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContestProblemsController],
      providers: [ContestProblemsService],
    }).compile();

    controller = module.get<ContestProblemsController>(ContestProblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
