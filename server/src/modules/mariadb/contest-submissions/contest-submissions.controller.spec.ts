import { Test, TestingModule } from '@nestjs/testing';
import { ContestSubmissionsController } from './contest-submissions.controller';
import { ContestSubmissionsService } from './contest-submissions.service';

describe('ContestSubmissionsController', () => {
  let controller: ContestSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContestSubmissionsController],
      providers: [ContestSubmissionsService],
    }).compile();

    controller = module.get<ContestSubmissionsController>(ContestSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
