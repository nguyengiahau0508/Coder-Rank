import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthProvidersModule } from "./auth_providers/auth-providers.module";
import { SessionsModule } from "./sessions/sessions.module";
import { TokensModule } from "./tokens/tokens.module";
import { CommentsModule } from './comments/comments.module';
import { ContestProblemsModule } from './contest-problems/contest-problems.module';
import { ContestSubmissionsModule } from './contest-submissions/contest-submissions.module';
import { ContestsModule } from './contests/contests.module';
import { LeaderBoardsModule } from './leader-boards/leader-boards.module';
import { ProblemsModule } from './problems/problems.module';
import { RatingsModule } from './ratings/ratings.module';
import { SolutionCommentsModule } from './solution-comments/solution-comments.module';
import { SolutionTagsModule } from './solution-tags/solution-tags.module';
import { SolutionsModule } from './solutions/solutions.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TagsModule } from './tags/tags.module';
import { TestcasesModule } from './testcases/testcases.module';
import { TestcaseResultModule } from './testcase-result/testcase-result.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    UsersModule,
    AuthProvidersModule,
    SessionsModule,
    TokensModule,
    CommentsModule,
    ContestProblemsModule,
    ContestSubmissionsModule,
    ContestsModule,
    LeaderBoardsModule,
    ProblemsModule,
    RatingsModule,
    SolutionCommentsModule,
    SolutionTagsModule,
    SolutionsModule,
    SubmissionsModule,
    TagsModule,
    TestcasesModule,
    TestcaseResultModule,
    CoursesModule,
    LessonsModule,
    QuestionsModule,
    AnswersModule,
  ]
})

export class MariadbFeatureModule { }
