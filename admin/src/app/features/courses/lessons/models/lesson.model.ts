import { Course } from "../../models/course.model";

export interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
  course: Course;
  questions: Question[];
}

export interface Question {
  id: number
  text: string;
  order: number;
  type: 'multiple' | 'single';
  //lesson: Lesson;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
  //question: Question;
}
