import { BaseEntity } from "src/common/shared/mariadb/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Lesson } from "../../lessons/entities/lesson.entity";

@Entity()
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  fileId: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
