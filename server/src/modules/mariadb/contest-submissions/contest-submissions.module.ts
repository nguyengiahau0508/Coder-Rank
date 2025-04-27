import { Module } from '@nestjs/common';
import { ContestSubmissionsService } from './contest-submissions.service';
import { ContestSubmissionsController } from './contest-submissions.controller';

@Module({
  controllers: [ContestSubmissionsController],
  providers: [ContestSubmissionsService],
})
export class ContestSubmissionsModule {}
