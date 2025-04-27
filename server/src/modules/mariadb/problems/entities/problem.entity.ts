
import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Tag } from "../../tags/entities/tag.entity";
import { Testcase } from "../../testcases/entities/testcase.entity";
import { Submission } from "../../submissions/entities/submission.entity";
import { Solution } from "../../solutions/entities/solution.entity";
import { Contest } from "../../contests/entities/contest.entity";

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity()
export class Problem extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.EASY
  })
  difficulty: Difficulty;

  @Index()
  @Column()
  userId: number;

  @Column({
    type: 'float',
    precision: 4,
    default: 1.0,
  })
  timeLimit: number;

  @Column({
    type: 'int',
    default: 256, // MB
  })
  memoryLimit: number;

  @Column({ default: false })
  isInContest: boolean;

  @Column({ type: 'float', default: 1000 })
  rankScore: number;

  @ManyToMany(() => Tag, (tag) => tag.problems)
  @JoinTable({
    name: "problem_tag",
    joinColumn: {
      name: "problemId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
    },
  })
  tags: Tag[]

  @OneToMany(() => Testcase, (testcase) => testcase.problem)
  testcases: Testcase[];

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[]

  @OneToMany(() => Solution, (solution) => solution.problem)
  solutions: Solution[]

  @ManyToOne(() => Contest, (contest) => contest.problems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  contest: Contest;
}

