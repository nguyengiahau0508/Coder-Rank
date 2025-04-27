import { Contest } from "./contest.model";
import { User } from "./user.model";

export interface Leaderboard {
  id: number;
  contest: Contest
  user: User
  score: number;
  rank?: number; // Có thể null nếu chưa xếp hạng
  updatedAt?: string
  oldRating?: number;
  newRating?: number;
}

