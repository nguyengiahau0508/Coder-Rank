class SubmissionResultDto {
  submissionId: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  testCases: TestCaseResultDto[];
  totalExecutionTime: number;
  maxMemoryUsed: number;
  createdAt: Date;
}
