import { Contest } from "../../contests/models/contest.model";
import { Tag } from "./tag.models";

export interface Problem {
  id?: number
  title?: string;
  description?: string;
  note?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  userId?: number;
  timeLimit?: number;
  memoryLimit?: number;
  isPublic?: boolean;
  tags?: Tag[],
  createdAt?: string;
  isInContest?: boolean;
  contest?: Contest;
  //testcases: Testcase[];
  //submissions: Submission[]
  //solutions: Solution[]
}
