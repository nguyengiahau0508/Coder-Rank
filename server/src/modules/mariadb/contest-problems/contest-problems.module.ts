import { Module } from '@nestjs/common';
import { ContestProblemsService } from './contest-problems.service';
import { ContestProblemsController } from './contest-problems.controller';

@Module({
  controllers: [ContestProblemsController],
  providers: [ContestProblemsService],
})
export class ContestProblemsModule {}
