import { Problem } from "./problem.model";
import { User } from "./user.model";

export interface Contest {
  id: number;
  title: string;
  description?: string;
  image?: string;
  sponsor?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  timeUntilStart?: string;
  status: string;
  participants: User[];
  problems: Problem[];
}

