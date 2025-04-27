import { Module } from '@nestjs/common';
import { LeaderBoardsService } from './leader-boards.service';
import { LeaderBoardsController } from './leader-boards.controller';
import { LeaderBoard } from './entities/leader-board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderBoardRepository } from './leader-board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LeaderBoard])],
  controllers: [LeaderBoardsController],
  providers: [LeaderBoardsService, LeaderBoardRepository],
  exports: [LeaderBoardsService],
})
export class LeaderBoardsModule { }
