import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { SubmissionRepository } from './submission.repository';
import { RunnerModule } from 'src/modules/coderunner/runner.module';
import { TestcasesModule } from '../testcases/testcases.module';
import { TestcaseResultModule } from '../testcase-result/testcase-result.module';
import { ProblemsModule } from '../problems/problems.module';
import { LeaderBoardsModule } from '../leader-boards/leader-boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Submission]), RunnerModule, TestcasesModule, TestcaseResultModule, ProblemsModule, LeaderBoardsModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionRepository],
  exports: [SubmissionsService]
})
export class SubmissionsModule { }
