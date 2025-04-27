import { Injectable } from '@nestjs/common';
import { CreateSolutionTagDto } from './dto/create-solution-tag.dto';
import { UpdateSolutionTagDto } from './dto/update-solution-tag.dto';

@Injectable()
export class SolutionTagsService {
  create(createSolutionTagDto: CreateSolutionTagDto) {
    return 'This action adds a new solutionTag';
  }

  findAll() {
    return `This action returns all solutionTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solutionTag`;
  }

  update(id: number, updateSolutionTagDto: UpdateSolutionTagDto) {
    return `This action updates a #${id} solutionTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} solutionTag`;
  }
}
