import { Injectable } from "@nestjs/common";
import { ContestsService } from "src/modules/mariadb/contests/contests.service";
import { Contest } from "src/modules/mariadb/contests/entities/contest.entity";
import { sampleContests } from "./contest-sample";

@Injectable()
export class ContestSeeder {
  constructor(
    private readonly contestService: ContestsService
  ) { }

  private readonly data: Partial<Contest>[] = sampleContests

  public async seed() {
    const existingContests = await this.contestService.findAll();
    if (existingContests.length === 0) {
      await this.contestService.saveMany(this.data);
    }

    console.log('✅ Contest seeding done!');
  }
}
