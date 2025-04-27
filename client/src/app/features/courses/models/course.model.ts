import { Lesson } from "../lessons/models/lesson.model";

export interface Course {
  id: number
  title: string;
  imageUrl?: string;
  description: string;
  lessons: Lesson[];
}
