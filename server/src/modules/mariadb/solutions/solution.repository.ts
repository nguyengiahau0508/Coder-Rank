import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Solution } from "./entities/solution.entity";
import { Repository } from "typeorm";

@Injectable()
export class SolutionRepository extends BaseAbstractRepository<Solution> {
  constructor(
    @InjectRepository(Solution) private readonly repository: Repository<Solution>
  ) { super(repository) }
}
