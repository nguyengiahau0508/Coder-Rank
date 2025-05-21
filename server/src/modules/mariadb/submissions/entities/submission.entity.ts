import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne, Index, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Problem } from "../../problems/entities/problem.entity";
import { TestcaseResult } from "../../testcase-result/entities/testcase-result.entity";
import { Language } from "src/common/enums/database/mariadb/submission.enums";
import { Status } from "src/common/enums/database/mariadb/db-tables";
import { Contest } from "../../contests/entities/contest.entity";



@Entity()
export class Submission extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Language,
    default: Language.CPP
  })
  language: Language;

  @Column({
    type: 'text',
    nullable: false // Không cho phép code rỗng
  })
  code: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @Column({ type: 'float', nullable: true })
  executionTime: number;

  @Column({ type: 'float', nullable: true })
  memoryUsed: number;

  @Column({ type: 'text', nullable: true })
  errorMessage: string; // Thông tin lỗi nếu có

  @ManyToOne(() => Contest, (contest) => contest.submissions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  contest: Contest

  @Index() // Thêm index để tối ưu truy vấn
  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @Index()
  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @OneToMany(() => TestcaseResult, (testcaseResult) => testcaseResult.submission)
  testcaseResults: TestcaseResult[]
}
