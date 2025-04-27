import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Contest } from "./entities/contest.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class ContestRepository extends BaseAbstractRepository<Contest> {
  constructor(
    @InjectRepository(Contest) private readonly respository: Repository<Contest>
  ) { super(respository) }
}
