import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseRepository extends BaseAbstractRepository<Course> {
  constructor(
    @InjectRepository(Course) private readonly repository: Repository<Course>,
  ) { super(repository) }
}
