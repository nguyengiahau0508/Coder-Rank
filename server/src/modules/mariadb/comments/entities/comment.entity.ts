import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Solution } from "../../solutions/entities/solution.entity";

@Entity()
export class Comment extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
  })
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentComment: Comment;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Solution, (solution) => solution.comments, {
    onDelete: 'CASCADE',
  })
  solution: Solution;
}
