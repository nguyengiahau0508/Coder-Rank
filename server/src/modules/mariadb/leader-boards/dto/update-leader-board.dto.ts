import { PartialType } from '@nestjs/swagger';
import { CreateLeaderBoardDto } from './create-leader-board.dto';

export class UpdateLeaderBoardDto extends PartialType(CreateLeaderBoardDto) {}
