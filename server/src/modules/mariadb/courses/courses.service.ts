import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Course } from './entities/course.entity';
import { CourseRepository } from './course.repository';

@Injectable()
export class CoursesService extends BaseService<Course> {
  constructor(
    readonly repository: CourseRepository
  ) {super(repository) }
}
