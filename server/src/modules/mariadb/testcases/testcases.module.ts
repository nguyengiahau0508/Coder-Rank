import { Module } from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { TestcasesController } from './testcases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testcase } from './entities/testcase.entity';
import { TestcaseRepository } from './testcase.repository';
import { ProblemsModule } from '../problems/problems.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testcase]),
    ProblemsModule
  ],
  controllers: [TestcasesController],
  providers: [TestcasesService, TestcaseRepository],
  exports: [TestcasesService]
})
export class TestcasesModule { }
