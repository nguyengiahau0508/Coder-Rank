
import { Injectable } from '@nestjs/common';
import { ProblemSeeder } from './seeder/problem/problem.seeder';
import { UserSeeder } from './seeder/user/user.seeder';
import { TagSeeder } from './seeder/tag/tag.seeder';
import { TestcaseSeeder } from './seeder/testcase/testcase.seeder';
import { ContestSeeder } from './seeder/constest/contest.seeder';
import { CoursesSeeder } from './seeder/courses/courses.seeder';
import { LessonsSeeder } from './seeder/Lessons/lesson.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly problemSeeder: ProblemSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly tagSeeder: TagSeeder,
    private readonly testcaseSeeder: TestcaseSeeder,
    private readonly contestSeeder: ContestSeeder,
    private readonly courseSeeder: CoursesSeeder,
    private readonly lessonsSeeder: LessonsSeeder,
  ) { }

  async seed() {
    await this.userSeeder.seed()
    await this.tagSeeder.seed()
    await this.problemSeeder.seed()
    await this.testcaseSeeder.seed()
    await this.contestSeeder.seed()
    await this.courseSeeder.seed()
    await this.lessonsSeeder.seed()
    console.log('🎉 Seeding completed!');
  }
}
