import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestcaseResultService } from './testcase-result.service';

@Controller('testcase-result')
export class TestcaseResultController {
  constructor(private readonly testcaseResultService: TestcaseResultService) {}
}
