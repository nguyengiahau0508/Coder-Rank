import { BaseEntity } from 'src/common/shared/mariadb/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Contest } from '../../contests/entities/contest.entity';

@Entity()
export class LeaderBoard extends BaseEntity {
  @ManyToOne(() => Contest, (contest) => contest.leaderBoards, {
    onDelete: 'CASCADE'
  })
  contest: Contest;

  @ManyToOne(() => User, (user) => user.leaderBoards, {
    onDelete: 'CASCADE'
  })
  user: User;

  @Column({ type: 'float', default: 0 })
  score: number;

  @Column({ nullable: true })
  rank?: number; // Có thể null nếu chưa xếp hạng

  @Column({ default: 0 })
  oldRating: number;

  @Column({ nullable: true })
  newRating: number;
}
