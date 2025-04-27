
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmEntity,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity extends TypeOrmEntity {
  @ApiProperty({ description: "ID duy nhất của entity", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Thời điểm entity được tạo",
    example: "2025-03-05T12:00:00.000Z"
  })
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Thời điểm entity được cập nhật lần cuối",
    example: "2025-03-05T12:30:00.000Z"
  })
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "Đánh dấu entity đã bị xóa hay chưa",
    example: false
  })
  @Column({
    type: "boolean",
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isPublic: boolean;
}

