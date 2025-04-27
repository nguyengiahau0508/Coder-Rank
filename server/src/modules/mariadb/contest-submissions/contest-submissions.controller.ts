import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContestSubmissionsService } from './contest-submissions.service';
import { CreateContestSubmissionDto } from './dto/create-contest-submission.dto';
import { UpdateContestSubmissionDto } from './dto/update-contest-submission.dto';

@Controller('contest-submissions')
export class ContestSubmissionsController {
  constructor(private readonly contestSubmissionsService: ContestSubmissionsService) {}

  @Post()
  create(@Body() createContestSubmissionDto: CreateContestSubmissionDto) {
    return this.contestSubmissionsService.create(createContestSubmissionDto);
  }

  @Get()
  findAll() {
    return this.contestSubmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestSubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestSubmissionDto: UpdateContestSubmissionDto) {
    return this.contestSubmissionsService.update(+id, updateContestSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestSubmissionsService.remove(+id);
  }
}
