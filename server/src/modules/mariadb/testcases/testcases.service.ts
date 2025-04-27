import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Testcase } from './entities/testcase.entity';
import { TestcaseRepository } from './testcase.repository';
import { ProblemsService } from '../problems/problems.service';

@Injectable()
export class TestcasesService extends BaseService<Testcase> {
  constructor(
    readonly repository: TestcaseRepository,
    private readonly problemsService: ProblemsService
  ) { super(repository) }
}
