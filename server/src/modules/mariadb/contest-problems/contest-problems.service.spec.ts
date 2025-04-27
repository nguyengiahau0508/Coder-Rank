import { Test, TestingModule } from '@nestjs/testing';
import { ContestProblemsService } from './contest-problems.service';

describe('ContestProblemsService', () => {
  let service: ContestProblemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestProblemsService],
    }).compile();

    service = module.get<ContestProblemsService>(ContestProblemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
