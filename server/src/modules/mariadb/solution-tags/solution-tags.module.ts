import { Module } from '@nestjs/common';
import { SolutionTagsService } from './solution-tags.service';
import { SolutionTagsController } from './solution-tags.controller';

@Module({
  controllers: [SolutionTagsController],
  providers: [SolutionTagsService],
})
export class SolutionTagsModule {}
