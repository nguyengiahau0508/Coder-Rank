import { IsString, IsOptional, IsEnum, IsInt, IsPositive, IsArray, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Difficulty } from "../entities/problem.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { Type } from "class-transformer";

export class CreateProblemDto {
  @ApiProperty({ description: "Tiêu đề của bài toán", example: "Two Sum" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Mô tả bài toán", example: "Given an array of integers..." })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: "Ghi chú bổ sung", example: "Use efficient algorithm" })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ enum: Difficulty, description: "Độ khó của bài toán" })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ description: "ID của tác giả", example: 1 })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: "Giới hạn thời gian (ms)", example: 1000 })
  @IsInt()
  @IsPositive()
  timeLimit: number;

  @ApiProperty({ description: "Giới hạn bộ nhớ (MB)", example: 256 })
  @IsInt()
  @IsPositive()
  memoryLimit: number;

  @ApiProperty({ type: () => [Tag], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tag)
  tags?: Tag[];
}
