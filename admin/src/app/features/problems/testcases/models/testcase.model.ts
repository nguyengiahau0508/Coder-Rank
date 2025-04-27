import { Problem } from "../../models/problem.models"

export interface Testcase {
  id?: number
  input: string
  output: string
  isSample: boolean
  problem?: Problem
}
