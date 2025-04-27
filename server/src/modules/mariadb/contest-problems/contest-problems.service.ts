import { Injectable } from '@nestjs/common';
import { CreateContestProblemDto } from './dto/create-contest-problem.dto';
import { UpdateContestProblemDto } from './dto/update-contest-problem.dto';

@Injectable()
export class ContestProblemsService {
  create(createContestProblemDto: CreateContestProblemDto) {
    return 'This action adds a new contestProblem';
  }

  findAll() {
    return `This action returns all contestProblems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contestProblem`;
  }

  update(id: number, updateContestProblemDto: UpdateContestProblemDto) {
    return `This action updates a #${id} contestProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} contestProblem`;
  }
}
