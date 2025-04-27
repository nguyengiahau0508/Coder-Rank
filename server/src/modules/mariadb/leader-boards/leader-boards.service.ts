import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { LeaderBoard } from './entities/leader-board.entity';
import { LeaderBoardRepository } from './leader-board.repository';

@Injectable()
export class LeaderBoardsService extends BaseService<LeaderBoard> {
  constructor(
    readonly repository: LeaderBoardRepository,
  ) {
    super(repository);
  }
}
