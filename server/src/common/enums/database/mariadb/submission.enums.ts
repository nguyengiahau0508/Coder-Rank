
export enum Language {
  CPP = 'cpp',
  PYTHON = "python",
  JAVA = "java",
  JAVASCRIPT = "javascript"
}

export enum Status {
  PENDING = 'pending',     // Đang chấm
  ACCEPTED = 'accepted',
  WRONG_ANSWER = 'wrong_answer', // Sửa lỗi chính tả
  TIME_LIMIT_EXCEEDED = 'time_limit_exceeded',
  MEMORY_LIMIT_EXCEEDED = 'memory_limit_exceeded',
  RUNTIME_ERROR = 'runtime_error',
  COMPILATION_ERROR = 'compilation_error'
}
