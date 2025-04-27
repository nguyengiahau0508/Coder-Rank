import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTagDto {
  @ApiProperty({ description: "Tên của tag", example: "Dynamic Programming" })
  @IsString()
  name: string;
}
