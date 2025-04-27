import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContestProblemsService } from './contest-problems.service';
import { CreateContestProblemDto } from './dto/create-contest-problem.dto';
import { UpdateContestProblemDto } from './dto/update-contest-problem.dto';

@Controller('contest-problems')
export class ContestProblemsController {
  constructor(private readonly contestProblemsService: ContestProblemsService) {}

  @Post()
  create(@Body() createContestProblemDto: CreateContestProblemDto) {
    return this.contestProblemsService.create(createContestProblemDto);
  }

  @Get()
  findAll() {
    return this.contestProblemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestProblemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestProblemDto: UpdateContestProblemDto) {
    return this.contestProblemsService.update(+id, updateContestProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestProblemsService.remove(+id);
  }
}
