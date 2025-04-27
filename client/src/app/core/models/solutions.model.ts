import { Comment } from "./comment.model";
import { Problem } from "./problem.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export interface Solution {
  id: number;
  problem: Problem
  title: string;
  content?: string;
  votes: number;
  views: number
  createdAt: string;
  tags: Tag[],
  user?: User,
  comments?: Comment[],
}
