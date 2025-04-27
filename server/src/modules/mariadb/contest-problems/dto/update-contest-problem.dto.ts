import { PartialType } from '@nestjs/swagger';
import { CreateContestProblemDto } from './create-contest-problem.dto';

export class UpdateContestProblemDto extends PartialType(CreateContestProblemDto) {}
