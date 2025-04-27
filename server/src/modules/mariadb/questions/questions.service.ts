import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService extends BaseService<Question> {
  constructor(
    readonly repository: QuestionRepository
  ) { super(repository) }
}
