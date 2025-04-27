import { Tag } from "./tag.model";

export interface Problem {
  id: number;
  title: string;
  description: string;
  note?: string
  difficulty: 'easy' | 'medium' | 'hard';
  userId: number;
  timeLimit: number;
  memoryLimit: number;
  createdAt: string;
  tags: Tag[];
}


