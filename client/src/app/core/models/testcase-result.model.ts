import { Status } from "./submission.model";

export interface TestcaseResult {
  id:number
  status: Status
  order: number
}
