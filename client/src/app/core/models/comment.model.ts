import { Solution } from "./solutions.model";
import { User } from "./user.model";

export interface Comment {
  id?: number;
  content: string;
  createdAt?: string; // ISO timestamp
  user?: User,
  solution?: Solution
  replies: Comment[];
  parentComment?: Comment | null;
  upvotes: number;
  downvotes: number;
}

