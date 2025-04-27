import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Repository } from "typeorm";

@Injectable()
export class QuestionRepository extends BaseAbstractRepository<Question> {
  constructor(
    @InjectRepository(Question) private readonly repository: Repository<Question>,
  ) { super(repository) }
}
