import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Problem } from "../../problems/entities/problem.entity";

@Entity()
export class Testcase extends BaseEntity {
  @Column({ type: 'text' })
  input: string

  @Column({ type: 'text' })
  output: string

  @Column({ type: 'boolean', default: false })
  isSample: boolean

  @ManyToOne(() => Problem, (problem) => problem.testcases)
  problem: Problem
}
