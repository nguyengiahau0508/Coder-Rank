import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { TestcaseResult } from "./entities/testcase-result.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TestcaseResultRepository extends BaseAbstractRepository<TestcaseResult> {
  constructor(
    @InjectRepository(TestcaseResult) private readonly respository: Repository<TestcaseResult>
  ) { super(respository) }
}
