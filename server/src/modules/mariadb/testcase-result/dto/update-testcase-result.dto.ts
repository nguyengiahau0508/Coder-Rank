import { PartialType } from '@nestjs/swagger';
import { CreateTestcaseResultDto } from './create-testcase-result.dto';

export class UpdateTestcaseResultDto extends PartialType(CreateTestcaseResultDto) {}
