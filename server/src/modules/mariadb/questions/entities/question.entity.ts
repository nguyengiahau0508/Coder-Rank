import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Lesson } from "../../lessons/entities/lesson.entity";
import { Answer } from "../../answers/entities/answer.entity";

@Entity()
export class Question extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column()
  order: number;

  @Column({
    type: 'enum',
    enum: ['single', 'multiple'],
    default: 'single',
    nullable: false,
  })
  type: 'single' | 'multiple';

  @ManyToOne(() => Lesson, (lesson) => lesson.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lesson: Lesson;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  answers: Answer[];
}
