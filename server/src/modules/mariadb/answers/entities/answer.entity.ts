import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Question } from "../../questions/entities/question.entity";

@Entity()
export class Answer extends BaseEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: Question;
}
