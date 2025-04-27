import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { authRoutes } from './features/auth/auth.router';
import { NotFoundComponent } from './shareds/components/not-found/not-found.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { ProblemsComponent } from './features/problems/problems.component';
import { problemsRoutes } from './features/problems/problems.routes';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ContestsComponent } from './features/contests/contests.component';
import { contestsRoutes } from './features/contests/contests.routes';
import { CoursesComponent } from './features/courses/courses.component';
import { coursesRoutes } from './features/courses/courses.routes';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: authRoutes },
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent, children: dashboardRoutes },
      { path: 'problems', component: ProblemsComponent, children: problemsRoutes },
      { path: 'contests', component: ContestsComponent, children: contestsRoutes },
      { path: 'courses', component: CoursesComponent, children: coursesRoutes },
    ]
  },
  { path: '**', component: NotFoundComponent }
];
