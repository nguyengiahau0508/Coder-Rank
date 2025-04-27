import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestcaseDto {
  @ApiProperty({
    description: 'The input data for the testcase',
    example: '1 2 3',
    type: String,
  })
  @IsString({ message: 'Input must be a string' })
  @IsNotEmpty({ message: 'Input is required' })
  @MaxLength(10000, { message: 'Input must not exceed 10000 characters' })
  input: string;

  @ApiProperty({
    description: 'The expected output for the testcase',
    example: '6',
    type: String,
  })
  @IsString({ message: 'Output must be a string' })
  @IsNotEmpty({ message: 'Output is required' })
  @MaxLength(10000, { message: 'Output must not exceed 10000 characters' })
  output: string;

  @ApiProperty({
    description: 'Indicates if this is a sample testcase visible to users',
    example: true,
    type: Boolean,
    default: false,
  })
  @IsBoolean({ message: 'isSample must be a boolean value' })
  isSample: boolean;
}
