import { Module } from '@nestjs/common';
import { SolutionCommentsService } from './solution-comments.service';
import { SolutionCommentsController } from './solution-comments.controller';

@Module({
  controllers: [SolutionCommentsController],
  providers: [SolutionCommentsService],
})
export class SolutionCommentsModule {}
