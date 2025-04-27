class TestCaseResultDto {
  order: number;
  input: string;
  expected: string;
  output: string;
  status: 'passed' | 'failed' | 'error';
  executionTime: number; // seconds
  memoryUsed: number; // MB
}
