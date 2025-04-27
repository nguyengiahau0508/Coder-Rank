import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonsService extends BaseService<Lesson> {
  constructor(
    readonly repository: LessonRepository
  ) { super(repository) }
}
