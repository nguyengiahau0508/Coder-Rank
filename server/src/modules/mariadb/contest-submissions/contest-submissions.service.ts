import { Injectable } from '@nestjs/common';
import { CreateContestSubmissionDto } from './dto/create-contest-submission.dto';
import { UpdateContestSubmissionDto } from './dto/update-contest-submission.dto';

@Injectable()
export class ContestSubmissionsService {
  create(createContestSubmissionDto: CreateContestSubmissionDto) {
    return 'This action adds a new contestSubmission';
  }

  findAll() {
    return `This action returns all contestSubmissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contestSubmission`;
  }

  update(id: number, updateContestSubmissionDto: UpdateContestSubmissionDto) {
    return `This action updates a #${id} contestSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} contestSubmission`;
  }
}
