import { Test, TestingModule } from '@nestjs/testing';
import { SolutionTagsController } from './solution-tags.controller';
import { SolutionTagsService } from './solution-tags.service';

describe('SolutionTagsController', () => {
  let controller: SolutionTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionTagsController],
      providers: [SolutionTagsService],
    }).compile();

    controller = module.get<SolutionTagsController>(SolutionTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
