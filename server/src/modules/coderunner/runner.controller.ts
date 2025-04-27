import { Controller, Post, Body } from '@nestjs/common';
import { RunnerService, RunnerTestCase } from './runner.service';


@Controller('run')
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) { }

  @Post('python')
  async runPython(@Body() body: { code: string; testCases: RunnerTestCase[] }) {
    return {
      data: await this.runnerService.runPython(body.code, body.testCases)
    }
  }

  @Post('cpp')
  async runCpp(@Body() body: { code: string; testCases: RunnerTestCase[] }) {
    return {
      data: await this.runnerService.runCpp(body.code, body.testCases)
    }
  }
}

