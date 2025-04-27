import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Lesson } from "./entities/lesson.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LessonRepository extends BaseAbstractRepository<Lesson> {
  constructor(
    @InjectRepository(Lesson) private readonly repository: Repository<Lesson>,
  ) { super(repository) }
}
