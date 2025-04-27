import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Answer } from './entities/answer.entity';
import { AnswersRepository } from './answer.repository';

@Injectable()
export class AnswersService extends BaseService<Answer> {
  constructor(
    readonly repository: AnswersRepository
  ) { super(repository) }
}
