import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Language } from 'src/common/enums/database/mariadb/submission.enums';

// DTO để tạo submission mới
export class CreateSubmissionDto {
  @ApiProperty({
    enum: Language,
    description: 'Ngôn ngữ lập trình của submission',
    default: Language.CPP,
  })
  @IsEnum(Language)
  @IsNotEmpty()
  language: Language;

  @ApiProperty({
    description: 'Mã nguồn của submission',
    example: '#include <iostream>\nint main() { std::cout << "Hello"; return 0; }',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'ID của user nộp bài',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID của bài toán',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  problemId: number;
}
