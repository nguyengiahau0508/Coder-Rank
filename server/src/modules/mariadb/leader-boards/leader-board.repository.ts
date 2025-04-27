import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { LeaderBoard } from "./entities/leader-board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LeaderBoardRepository extends BaseAbstractRepository<LeaderBoard> {
  constructor(
    @InjectRepository(LeaderBoard) private readonly repository: Repository<LeaderBoard>
  ) { 
    super(repository);
  }
}
