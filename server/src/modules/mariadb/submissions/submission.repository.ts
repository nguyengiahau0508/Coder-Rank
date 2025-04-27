import { Injectable } from "@nestjs/common";
import { MariadbBaseAbstractRepository } from "src/common/repositories/mariadb/base.abstract.repository";
import { Submission } from "./entities/submission.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";

@Injectable()
export class SubmissionRepository extends BaseAbstractRepository<Submission> {
  constructor(
    @InjectRepository(Submission) private readonly repository: Repository<Submission>
  ) {
    super(repository)
  }
}
