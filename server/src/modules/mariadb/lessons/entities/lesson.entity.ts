import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Course } from "../../courses/entities/course.entity";
import { Question } from "../../questions/entities/question.entity";

@Entity()
export class Lesson extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, (course) => course.lessons, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  course: Course;

  @OneToMany(() => Question, (question) => question.lesson, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  questions: Question[];
}
