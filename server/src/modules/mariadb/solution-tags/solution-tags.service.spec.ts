import { Test, TestingModule } from '@nestjs/testing';
import { SolutionTagsService } from './solution-tags.service';

describe('SolutionTagsService', () => {
  let service: SolutionTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionTagsService],
    }).compile();

    service = module.get<SolutionTagsService>(SolutionTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
