export const MARIADB_TABLES = {
  USER: 'user',
  AUTH_PROVIDER: 'auth_provider'
}

export enum Language {  // Thêm `export` trước enum
  CPP = 'cpp',
  PYTHON = "python",
  JAVA = "java",
  JAVASCRIPT = "javascript"
}

export enum Status {  // Thêm `export` trước enum
  PENDING = 'pending',     // Đang chấm
  ACCEPTED = 'accepted',
  WRONG_ANSWER = 'wrong_answer',
  TIME_LIMIT_EXCEEDED = 'time_limit_exceeded',
  MEMORY_LIMIT_EXCEEDED = 'memory_limit_exceeded',
  RUNTIME_ERROR = 'runtime_error',
  COMPILATION_ERROR = 'compilation_error'
}

