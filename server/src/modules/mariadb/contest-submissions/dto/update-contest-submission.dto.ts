import { PartialType } from '@nestjs/swagger';
import { CreateContestSubmissionDto } from './create-contest-submission.dto';

export class UpdateContestSubmissionDto extends PartialType(CreateContestSubmissionDto) {}
