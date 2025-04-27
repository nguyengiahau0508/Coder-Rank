import { Module } from '@nestjs/common';
import { TestcaseResultService } from './testcase-result.service';
import { TestcaseResultController } from './testcase-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestcaseResult } from './entities/testcase-result.entity';
import { TestcaseResultRepository } from './testcase-result.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TestcaseResult])],
  controllers: [TestcaseResultController],
  providers: [TestcaseResultService, TestcaseResultRepository],
  exports: [TestcaseResultService]
})
export class TestcaseResultModule { }
