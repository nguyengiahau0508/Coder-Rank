import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionCommentsService } from './solution-comments.service';
import { CreateSolutionCommentDto } from './dto/create-solution-comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution-comment.dto';

@Controller('solution-comments')
export class SolutionCommentsController {
  constructor(private readonly solutionCommentsService: SolutionCommentsService) {}

  @Post()
  create(@Body() createSolutionCommentDto: CreateSolutionCommentDto) {
    return this.solutionCommentsService.create(createSolutionCommentDto);
  }

  @Get()
  findAll() {
    return this.solutionCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionCommentDto: UpdateSolutionCommentDto) {
    return this.solutionCommentsService.update(+id, updateSolutionCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionCommentsService.remove(+id);
  }
}
