import { Test, TestingModule } from '@nestjs/testing';
import { ContestSubmissionsService } from './contest-submissions.service';

describe('ContestSubmissionsService', () => {
  let service: ContestSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestSubmissionsService],
    }).compile();

    service = module.get<ContestSubmissionsService>(ContestSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
