import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { TestcaseResult } from './entities/testcase-result.entity';
import { TestcaseResultRepository } from './testcase-result.repository';

@Injectable()
export class TestcaseResultService extends BaseService<TestcaseResult> {
  constructor(
    readonly repository: TestcaseResultRepository
  ) { super(repository) }
}
