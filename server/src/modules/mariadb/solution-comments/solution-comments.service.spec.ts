import { Test, TestingModule } from '@nestjs/testing';
import { SolutionCommentsService } from './solution-comments.service';

describe('SolutionCommentsService', () => {
  let service: SolutionCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionCommentsService],
    }).compile();

    service = module.get<SolutionCommentsService>(SolutionCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
