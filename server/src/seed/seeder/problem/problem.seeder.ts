
import { Injectable } from "@nestjs/common";
import { CreateProblemDto } from "src/modules/mariadb/problems/dto/create-problem.dto";
import { ProblemsService } from "src/modules/mariadb/problems/problems.service";
import { sampleProblems } from "./problems-sample";
import { sampleProblemTags } from "./problem-tags-sample";
import { TagsService } from "src/modules/mariadb/tags/tags.service";

@Injectable()
export class ProblemSeeder {
  private readonly problemData: CreateProblemDto[] = sampleProblems;
  private readonly problemTagMappings: { problemId: number; tagId: number }[] = sampleProblemTags;

  constructor(
    private readonly problemsService: ProblemsService,
    private readonly tagsService: TagsService
  ) { }

  public async seed() {
    const existingProblems = await this.problemsService.findAll();
    if (existingProblems.length === 0) {
      await this.problemsService.saveMany(this.problemData);

      for (const { problemId, tagId } of this.problemTagMappings) {
        const problem = await this.problemsService.findByCondition({
          where: { id: problemId },
          relations: ['tags'],
        });
        const tag = await this.tagsService.findByCondition({ where: { id: tagId } });

        if (problem && tag) {
          problem.tags.push(tag); // Gán tag vào danh sách tags của problem
          await this.problemsService.save(problem);
        }
      }
    }

    console.log('✅ Problem seeding done!');
  }
}

