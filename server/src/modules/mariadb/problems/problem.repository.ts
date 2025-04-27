import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Problem } from "./entities/problem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProblemRepository extends BaseAbstractRepository<Problem> {
  constructor(@InjectRepository(Problem) private readonly repository: Repository<Problem>) {
    super(repository)
  }
}
