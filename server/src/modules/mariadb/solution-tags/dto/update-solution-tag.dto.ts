import { PartialType } from '@nestjs/swagger';
import { CreateSolutionTagDto } from './create-solution-tag.dto';

export class UpdateSolutionTagDto extends PartialType(CreateSolutionTagDto) {}
