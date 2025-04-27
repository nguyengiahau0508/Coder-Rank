import { Column, Entity, ManyToOne } from "typeorm";
import { Submission } from "../../submissions/entities/submission.entity";
import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Status } from "src/common/enums/database/mariadb/db-tables";

@Entity()
export class TestcaseResult extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @Column()
  order: number

  @ManyToOne(() => Submission, (submission) => submission.testcaseResults, {
    onDelete: 'CASCADE'
  })
  submission: Submission
}
