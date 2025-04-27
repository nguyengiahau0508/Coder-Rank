import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { generateRandomName } from "src/common/utils/random-name.util";
import { Token } from "../../tokens/entities/token.entity";
import { AuthProvider } from "../../auth_providers/entities/auth-provider.entity";
import { Role } from "src/common/enums/authentication/role.enum";
import { Gender } from "src/common/enums/authentication/gender.enum";
import { generateFromEmail } from "unique-username-generator";
import { Submission } from "../../submissions/entities/submission.entity";
import { Solution } from "../../solutions/entities/solution.entity";
import { Contest } from "../../contests/entities/contest.entity";
import { LeaderBoard } from "../../leader-boards/entities/leader-board.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class User extends MariadbBaseEntity {
  @Column()
  username: string

  @Column()
  name: string;

  @Column({ select: false })
  email: string;

  @Column({ type: 'text' })
  avatar: string

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  authProvider: AuthProvider;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @Column({ nullable: true })
  phoneNumber: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  birthday: Date

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other
  })
  gender: Gender

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role

  @Column({
    default: 0
  })
  ratting: number

  @BeforeInsert()
  setName() {
    if (!this.name) {
      this.name = generateRandomName();
    }
  }

  @BeforeInsert()
  setUsername() {
    if (!this.username) {
      this.username = generateFromEmail(this.email, 5)
    }
  }

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[]

  @OneToMany(() => Solution, (solution) => solution.user)
  solutions: Solution[]

  @ManyToMany(() => Contest, (contest) => contest.participants)
  contests: Contest[]

  @OneToMany(() => LeaderBoard, (leaderBoard) => leaderBoard.user)
  leaderBoards: LeaderBoard[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}


