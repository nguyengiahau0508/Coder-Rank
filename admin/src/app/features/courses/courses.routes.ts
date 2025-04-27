import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { LessonsComponent } from "./lessons/lessons.component";
import { lessonsRoutes } from "./lessons/lessons.routes";

export const coursesRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'create', component: CreateComponent },
  { path: ':id/lessons', component: LessonsComponent, children: lessonsRoutes },
]
