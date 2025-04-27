import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";
import { lessonsRoutes } from "./lessons/lessons.routes";
import { LessonsComponent } from "./lessons/lessons.component";

export const coursesRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent, children: lessonsRoutes },
  { path: 'detail/:id/lessons', component: LessonsComponent, children: lessonsRoutes },
]
