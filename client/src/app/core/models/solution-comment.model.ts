export interface SolutionComment {
  id: number;
  solutionId: number;
  userId: number;
  parentId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
}
