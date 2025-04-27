import { Testcase } from '../core/models/testcase.model';

export const sampleTestcases: Testcase[] = [
  {
    id: 1, problemId: 1, input: `5
1 3 5 7 9
3
1 3 4
2 5 10
1 5 8
`, output: `1
2
3
`, isSample: true
  },
  { id: 2, problemId: 1, input: '3 2 4\n6', output: '1 2', isSample: true },
  { id: 3, problemId: 2, input: '5\n1 2 3 4 5\n3', output: '2', isSample: true },
  { id: 4, problemId: 2, input: '6\n10 20 30 40 50 60\n25', output: '-1', isSample: false },
  { id: 5, problemId: 3, input: 'abcabcbb', output: '3', isSample: true },
  { id: 6, problemId: 3, input: 'bbbbb', output: '1', isSample: false },
  { id: 7, problemId: 4, input: '6 9\n1 2 7\n1 3 9\n1 6 14\n2 3 10\n2 4 15\n3 4 11\n3 6 2\n4 5 6\n5 6 9', output: '0 7 9 20 26 11', isSample: true },
  { id: 8, problemId: 4, input: '3 3\n1 2 5\n2 3 10\n1 3 100', output: '0 5 15', isSample: false },
  { id: 9, problemId: 5, input: '3\n1 3\n2 6\n8 10', output: '1 3\n2 6\n8 10', isSample: true },
  { id: 10, problemId: 5, input: '4\n1 4\n2 3\n5 6\n7 8', output: '1 4\n5 6\n7 8', isSample: false },
  { id: 11, problemId: 6, input: '4\n4 8 5 3\n7', output: '10', isSample: true },
  { id: 12, problemId: 6, input: '5\n2 3 4 5 9\n10', output: '11', isSample: false },
  { id: 13, problemId: 7, input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', output: 'Solved Board', isSample: true },
  { id: 14, problemId: 7, input: '......7.8\n1..3.....\n...2...6.\n.....6.9.\n3..8.1..4\n.2.7.....\n.6...2...\n.....8..5\n.1.5.....', output: 'Solved Board', isSample: false },
  { id: 15, problemId: 8, input: '"aab"', output: '[aa, b]', isSample: true },
  { id: 16, problemId: 8, input: '"racecar"', output: '[r, aceca, r]', isSample: false },
  { id: 17, problemId: 9, input: '2\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3', output: '10\n-1\n30', isSample: true },
  { id: 18, problemId: 9, input: '3\nPUT 1 5\nPUT 2 10\nGET 1\nPUT 3 15\nGET 2\nPUT 4 20\nGET 3\nGET 4', output: '5\n-1\n15\n20', isSample: false },
  { id: 19, problemId: 10, input: '4\n4 2\n2 3\n3 1\n4 1', output: '4 2 3 1', isSample: true },
  { id: 20, problemId: 10, input: '6\n6 3\n6 1\n5 1\n5 2\n3 4\n4 2', output: '6 5 3 4 1 2', isSample: false },
];

