import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { TestcasesComponent } from "./testcases/testcases.component";
import { testCasesRoutes } from "./testcases/testcases.routes";

export const problemsRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'create', component: CreateComponent },
  { path: ':problemId/testcases', component: TestcasesComponent, children: testCasesRoutes }
]
