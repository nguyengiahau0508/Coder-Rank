import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Problem } from "../../problems/entities/problem.entity";
import { User } from "../../users/entities/user.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class Solution extends BaseEntity {
  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ default: 0 })
  votes: number

  @Column({ default: 0 })
  views: number

  @ManyToOne(() => Problem, (problem) => problem.solutions)
  problem: Problem

  @ManyToOne(() => User, (user) => user.solutions, {
    eager: true,
  })
  user: User

  @ManyToMany(() => Tag, (tag) => tag.solutions)
  @JoinTable({
    name: "solution_tag",
    joinColumn: {
      name: "solutionId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
    },
  })
  tags: Tag[]

  @OneToMany(() => Comment, (comment) => comment.solution, {
    cascade: true,
  })
  comments: Comment[]
}
