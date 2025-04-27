import { Test, TestingModule } from '@nestjs/testing';
import { SolutionCommentsController } from './solution-comments.controller';
import { SolutionCommentsService } from './solution-comments.service';

describe('SolutionCommentsController', () => {
  let controller: SolutionCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionCommentsController],
      providers: [SolutionCommentsService],
    }).compile();

    controller = module.get<SolutionCommentsController>(SolutionCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
