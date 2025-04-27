import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { Problem } from "../../problems/entities/problem.entity";
import { Solution } from "../../solutions/entities/solution.entity";

@Entity()
export class Tag extends BaseEntity {
  @ApiProperty({ description: "Tên của tag" })
  @Column()
  name: string;

  @ApiProperty({
    description: "Danh sách các bài toán có tag này",
    type: () => [Problem]
  })
  @ManyToMany(() => Problem, (problem) => problem.tags)
  problems: Problem[];

  @ApiProperty({
    description: "Danh sách các giải pháp có tag này",
    type: () => [Solution]
  })
  @ManyToMany(() => Solution, (solution) => solution.tags)
  solutions: Solution[];
}

