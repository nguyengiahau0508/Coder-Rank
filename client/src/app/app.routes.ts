import {Routes} from '@angular/router';
import {ProblemsetComponent} from './features/problemset/problemset.component';
import {ProblemDetailComponent} from './features/problem-detail/problem-detail.component';
import {RunnerComponent} from './features/runner/runner.component';
import {ProblemsetStatusComponent} from './features/problemset-status/problemset-status.component';
import {CallbackComponent} from './features/callback/callback.component';
import {ProblemPostSolutionComponent} from './features/problem-post-solution/problem-post-solution.component';
import {ProblemSolutionsComponent} from './features/problem-solutions/problem-solutions.component';
import {ProblemSolutionDetailComponent} from './features/problem-solution-detail/problem-solution-detail.component';
import {NotFoundComponent} from './features/not-found/not-found.component';
import {ContestsComponent} from './features/contests/contests.component';
import {MyProblemSubmissionComponent} from './features/my-problem-submission/my-problem-submission.component';
import {DetailContestComponent} from './features/contests/detail-contest/detail-contest.component';
import {ContestRankingComponent} from './features/contests/contest-ranking/contest-ranking.component';
import {CoursesComponent} from './features/courses/courses.component';
import {coursesRoutes} from './features/courses/courses.routes';
import {ProfileComponent} from './features/profile/profile.component';
import {EmailVerifyComponent} from './features/email-verify/email-verify.component';

export const routes: Routes = [
  //for problem
  {path: 'problems', component: ProblemsetComponent},
  {path: 'problems/status', component: ProblemsetStatusComponent},
  {path: 'problems/:problemId/solutions', component: ProblemSolutionsComponent},
  {path: 'problems/:problemId/solutions/:solutionId', component: ProblemSolutionDetailComponent},
  {path: 'problems/:problemId/post-solution', component: ProblemPostSolutionComponent},
  {path: 'problems/:problemId/submit', component: RunnerComponent},
  {path: 'problems/:problemId/history', component: MyProblemSubmissionComponent},
  {path: 'problems/:problemId', component: ProblemDetailComponent},

  //for contests
  {path: 'contests', component: ContestsComponent},
  {path: 'contests/:contestId', component: DetailContestComponent},
  {path: 'contests/:contestId/ranking', component: ContestRankingComponent},

  {path: 'courses', component: CoursesComponent, children: coursesRoutes},

  {path: 'runner', component: RunnerComponent},

  {path: 'profile', component: ProfileComponent},

  {path: 'email-verify', component: EmailVerifyComponent},

  {path: 'callback', component: CallbackComponent},
  {path: '', redirectTo: '/problems', pathMatch: 'full'}, // Redirect mặc định
  {path: '**', component: NotFoundComponent},

];

