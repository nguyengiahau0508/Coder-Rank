import { Injectable } from '@nestjs/common';
import { CreateSolutionCommentDto } from './dto/create-solution-comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution-comment.dto';

@Injectable()
export class SolutionCommentsService {
  create(createSolutionCommentDto: CreateSolutionCommentDto) {
    return 'This action adds a new solutionComment';
  }

  findAll() {
    return `This action returns all solutionComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solutionComment`;
  }

  update(id: number, updateSolutionCommentDto: UpdateSolutionCommentDto) {
    return `This action updates a #${id} solutionComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} solutionComment`;
  }
}
