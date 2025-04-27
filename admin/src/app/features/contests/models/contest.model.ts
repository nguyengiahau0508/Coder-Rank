import { Problem } from "../../problems/models/problem.models";

export interface Contest {
  id?: number;
  title?: string;
  image?: string;
  description?: string
  sponsor?: string;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  problems?: Problem[];
  status?: 'UPCOMING' | 'ONGOING' | 'FINISHED';
}
