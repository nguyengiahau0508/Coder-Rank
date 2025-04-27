import { Module } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { ContestRepository } from './contests.repository';
import { GoogleDriveModule } from 'src/integrations/google-drive/google-drive.module';
import { ProblemsModule } from '../problems/problems.module';
import { LeaderBoardsModule } from '../leader-boards/leader-boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contest]), GoogleDriveModule, ProblemsModule, LeaderBoardsModule],
  controllers: [ContestsController],
  providers: [ContestsService, ContestRepository],
  exports: [ContestsService],
})
export class ContestsModule { }
