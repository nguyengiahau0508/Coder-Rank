
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ProblemSeeder } from './seeder/problem/problem.seeder';
import { ProblemsModule } from 'src/modules/mariadb/problems/problems.module';
import { UsersModule } from 'src/modules/mariadb/users/users.module';
import { UserSeeder } from './seeder/user/user.seeder';
import { TagsModule } from 'src/modules/mariadb/tags/tags.module';
import { TagSeeder } from './seeder/tag/tag.seeder';
import { TestcasesModule } from 'src/modules/mariadb/testcases/testcases.module';
import { TestcaseSeeder } from './seeder/testcase/testcase.seeder';
import { ContestsModule } from 'src/modules/mariadb/contests/contests.module';
import { ContestSeeder } from './seeder/constest/contest.seeder';
import { CoursesModule } from 'src/modules/mariadb/courses/courses.module';
import { CoursesSeeder } from './seeder/courses/courses.seeder';
import { LessonsModule } from 'src/modules/mariadb/lessons/lessons.module';
import { LessonsSeeder } from './seeder/Lessons/lesson.seeder';

@Module({
  imports: [
    ProblemsModule,
    UsersModule,
    TagsModule,
    TestcasesModule,
    ContestsModule,
    CoursesModule,
    LessonsModule
  ],
  providers: [
    SeederService,
    ProblemSeeder,
    UserSeeder,
    TagSeeder,
    TestcaseSeeder,
    ContestSeeder,
    CoursesSeeder,
    LessonsSeeder
  ],
  exports: [SeederService],
})
export class SeederModule { }
