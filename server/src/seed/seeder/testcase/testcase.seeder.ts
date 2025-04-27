import { Injectable } from "@nestjs/common";
import { ProblemsService } from "src/modules/mariadb/problems/problems.service";
import { TestcasesService } from "src/modules/mariadb/testcases/testcases.service";
import { sampleTestcases } from "./testcase-sample";

@Injectable()
export class TestcaseSeeder {
  private readonly testcases: { problemId: number, input: string, output: string, isSample: boolean }[] = sampleTestcases
  constructor(
    private readonly testcasesService: TestcasesService,
    private readonly problemsService: ProblemsService
  ) {
  }

  public async seed() {
    const exists = await this.testcasesService.findAll()
    if (exists.length == 0) {
      for (const testcase of this.testcases) {
        const problem = await this.problemsService.findOneById(testcase.problemId)
        if (problem) await this.testcasesService.save({
          ...testcase,
          problem
        })
      }
    }

    console.log('✅ Testcase seeding done!');
  }
}
