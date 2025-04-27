export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  rating: number;
  avatar: string;
  role: 'user' | 'admin' | 'problemsetter';
  createdAt: string; // ISO timestamp
}

