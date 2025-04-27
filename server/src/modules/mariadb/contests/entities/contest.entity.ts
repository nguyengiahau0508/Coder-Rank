import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Problem } from "../../problems/entities/problem.entity";
import { User } from "../../users/entities/user.entity";
import { LeaderBoard } from "../../leader-boards/entities/leader-board.entity";
import { Submission } from "../../submissions/entities/submission.entity";

export enum ContestStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}

@Entity()
export class Contest extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ nullable: true })
  fileId: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  sponsor?: string;

  @Column({ type: "datetime" })
  startTime: Date;

  @Column({ type: "datetime" })
  endTime: Date;

  @Column({ type: 'enum', enum: ContestStatus, default: ContestStatus.UPCOMING })
  status: ContestStatus;

  @Column({ type: 'boolean', default: false })
  isRankCalculated: boolean;

  @OneToMany(() => Problem, (problem) => problem.contest)
  problems: Problem[];

  @ManyToMany(() => User, (user) => user.contests)
  @JoinTable()
  participants: User[];

  @OneToMany(() => LeaderBoard, (leaderBoard) => leaderBoard.contest, {
    cascade: true,
  })
  leaderBoards: LeaderBoard[];

  @OneToMany(() => Submission, (submission) => submission.contest)
  submissions: Submission[];
}
