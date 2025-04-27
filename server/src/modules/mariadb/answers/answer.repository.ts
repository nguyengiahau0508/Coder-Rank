import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Answer } from "./entities/answer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AnswersRepository extends BaseAbstractRepository<Answer> {
  constructor(
    @InjectRepository(Answer) private readonly repository: Repository<Answer>
  ) { super(repository) }
}
