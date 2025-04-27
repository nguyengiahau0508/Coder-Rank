export interface ContestSubmission {
  id: number;
  contestId: number;
  userId: number;
  problemId: number;
  submissionId: number;
  submittedAt: string; // ISO timestamp
}

