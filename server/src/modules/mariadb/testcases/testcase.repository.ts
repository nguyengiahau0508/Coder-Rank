import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Testcase } from "./entities/testcase.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TestcaseRepository extends BaseAbstractRepository<Testcase> {
  constructor(
    @InjectRepository(Testcase) private readonly repository: Repository<Testcase>
  ) { super(repository) }
}
