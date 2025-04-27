import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionTagsService } from './solution-tags.service';
import { CreateSolutionTagDto } from './dto/create-solution-tag.dto';
import { UpdateSolutionTagDto } from './dto/update-solution-tag.dto';

@Controller('solution-tags')
export class SolutionTagsController {
  constructor(private readonly solutionTagsService: SolutionTagsService) {}

  @Post()
  create(@Body() createSolutionTagDto: CreateSolutionTagDto) {
    return this.solutionTagsService.create(createSolutionTagDto);
  }

  @Get()
  findAll() {
    return this.solutionTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionTagDto: UpdateSolutionTagDto) {
    return this.solutionTagsService.update(+id, updateSolutionTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionTagsService.remove(+id);
  }
}
