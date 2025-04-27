import { Language, Status, Submission } from "../core/models/submission.model";

export const sampleSubmissions: Submission[] = [
  {
    id: 1,
    userId: 1,
    problemId: 1,
    language: Language.CPP,
    code: '#include <iostream>\nint main() { std::cout << "Hello, World!"; return 0; }',
    status: Status.ACCEPTED,
    executionTime: 50,
    memoryUsed: 32,
    createdAt: '2024-02-01T10:15:30Z'
  },
  {
    id: 2,
    userId: 2,
    problemId: 1,
    language: Language.PYTHON,
    code: 'print("Hello, World!")',
    status: Status.WRONG_ANSWER,
    executionTime: 20,
    memoryUsed: 10,
    createdAt: '2024-02-01T10:20:45Z'
  },
  {
    id: 3,
    userId: 3,
    problemId: 2,
    language: Language.JAVA,
    code: 'public class Main { public static void main(String[] args) { System.out.println("Hello"); } }',
    status: Status.ACCEPTED,
    executionTime: 100,
    memoryUsed: 64,
    createdAt: '2024-02-02T12:30:00Z'
  },
  {
    id: 4,
    userId: 1,
    problemId: 3,
    language: Language.JAVASCRIPT,
    code: 'console.log("Hello, World!");',
    status: Status.TIME_LIMIT_EXCEEDED,
    createdAt: '2024-02-02T15:45:10Z'
  },
  {
    id: 5,
    userId: 4,
    problemId: 4,
    language: Language.CPP, // Sửa từ 'cpp' thành Language.CPP
    code: '#include <iostream>\nint main() { int x; std::cin >> x; return x; }',
    status: Status.RUNTIME_ERROR,
    createdAt: '2024-02-03T09:00:20Z'
  },
  {
    id: 6,
    userId: 5,
    problemId: 5,
    language: Language.PYTHON, // Sửa từ 'python' thành Language.PYTHON
    code: 'x = input()\nprint(int(x) * 2)',
    status: Status.ACCEPTED,
    executionTime: 35,
    memoryUsed: 12,
    createdAt: '2024-02-03T14:22:30Z'
  },
  {
    id: 7,
    userId: 2,
    problemId: 6,
    language: Language.JAVA, // Sửa từ 'java' thành Language.JAVA
    code: 'class Main { public static void main(String[] args) { System.out.println("Test"); } }',
    status: Status.PENDING,
    createdAt: '2024-02-04T17:10:05Z'
  },
  {
    id: 8,
    userId: 3,
    problemId: 7,
    language: Language.JAVASCRIPT, // Sửa từ 'js' thành Language.JAVASCRIPT
    code: 'let x = prompt(); console.log(x * 2);',
    status: Status.WRONG_ANSWER,
    createdAt: '2024-02-04T20:05:50Z'
  },
  {
    id: 9,
    userId: 1,
    problemId: 8,
    language: Language.CPP, // Sửa từ 'cpp' thành Language.CPP
    code: '#include <iostream>\nint main() { std::cout << "Test"; return 0; }',
    status: Status.ACCEPTED,
    executionTime: 80,
    memoryUsed: 40,
    createdAt: '2024-02-05T08:30:15Z'
  },
  {
    id: 10,
    userId: 6,
    problemId: 9,
    language: Language.PYTHON, // Sửa từ 'python' thành Language.PYTHON
    code: 'print("Accepted")',
    status: Status.RUNTIME_ERROR,
    executionTime: 18,
    memoryUsed: 8,
    createdAt: '2024-02-05T19:45:00Z'
  },
  {
    id: 11,
    userId: 2,
    problemId: 10,
    language: Language.JAVA, // Sửa từ 'java' thành Language.JAVA
    code: 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }',
    status: Status.PENDING,
    executionTime: 120,
    memoryUsed: 48,
    createdAt: '2024-02-06T10:00:00Z'
  },
  {
    id: 12,
    userId: 3,
    problemId: 1,
    language: Language.PYTHON, // Sửa từ 'python' thành Language.PYTHON
    code: 'print("Hello World")',
    status: Status.TIME_LIMIT_EXCEEDED,
    createdAt: '2024-02-06T11:15:30Z'
  },
  {
    id: 13,
    userId: 4,
    problemId: 2,
    language: Language.CPP, // Sửa từ 'cpp' thành Language.CPP
    code: '#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << a + b; return 0; }',
    status: Status.MEMORY_LIMIT_EXCEEDED,
    executionTime: 60,
    memoryUsed: 28,
    createdAt: '2024-02-06T12:20:45Z'
  },
  {
    id: 14,
    userId: 5,
    problemId: 3,
    language: Language.JAVASCRIPT, // Sửa từ 'js' thành Language.JAVASCRIPT
    code: 'console.log("Hello World");',
    status: Status.TIME_LIMIT_EXCEEDED,
    createdAt: '2024-02-06T14:30:10Z'
  },
  {
    id: 15,
    userId: 6,
    problemId: 4,
    language: Language.JAVA, // Sửa từ 'java' thành Language.JAVA
    code: 'class Main { public static void main(String[] args) { System.out.println("Java Code"); } }',
    status: Status.COMPILATION_ERROR,
    createdAt: '2024-02-06T16:45:20Z'
  },
  {
    id: 16,
    userId: 2,
    problemId: 5,
    language: Language.PYTHON, // Sửa từ 'python' thành Language.PYTHON
    code: 'x = int(input())\nprint(x * 2)',
    status: Status.ACCEPTED,
    executionTime: 25,
    memoryUsed: 14,
    createdAt: '2024-02-06T18:55:30Z'
  },
  {
    id: 17,
    userId: 3,
    problemId: 6,
    language: Language.CPP, // Sửa từ 'cpp' thành Language.CPP
    code: '#include <iostream>\nint main() { std::cout << "Test Case"; return 0; }',
    status: Status.ACCEPTED,
    executionTime: 90,
    memoryUsed: 36,
    createdAt: '2024-02-07T09:10:05Z'
  },
  {
    id: 18,
    userId: 4,
    problemId: 7,
    language: Language.JAVASCRIPT, // Sửa từ 'js' thành Language.JAVASCRIPT
    code: 'let a = parseInt(prompt()); console.log(a * 2);',
    status: Status.WRONG_ANSWER,
    createdAt: '2024-02-07T10:05:50Z'
  },
  {
    id: 19,
    userId: 5,
    problemId: 8,
    language: Language.JAVA, // Sửa từ 'java' thành Language.JAVA
    code: 'public class Main { public static void main(String[] args) { System.out.println("Accepted"); } }',
    status: Status.WRONG_ANSWER,
    executionTime: 85,
    memoryUsed: 50,
    createdAt: '2024-02-07T12:30:15Z'
  },
  {
    id: 20,
    userId: 6,
    problemId: 9,
    language: Language.PYTHON, // Sửa từ 'python' thành Language.PYTHON
    code: 'print("Accepted")',
    status: Status.ACCEPTED,
    executionTime: 22,
    memoryUsed: 9,
    createdAt: '2024-02-07T15:45:00Z'
  }
];
