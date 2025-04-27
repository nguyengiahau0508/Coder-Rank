export interface Rating {
  id: number;
  userId: number;
  contestId: number;
  oldRating: number;
  newRating: number;
  changedAt: string; // ISO timestamp
}

