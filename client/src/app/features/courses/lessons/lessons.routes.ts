import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";

export const lessonsRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail/:lessonId', component: DetailComponent },
]
