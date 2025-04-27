import { Controller, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Submission } from './entities/submission.entity';
import { SubmissionRepository } from './submission.repository';
import { RunnerService, RunnerTestCase } from 'src/modules/coderunner/runner.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { TestcasesService } from '../testcases/testcases.service';
import { Testcase } from '../testcases/entities/testcase.entity';
import { Status } from 'src/common/enums/database/mariadb/db-tables';
import { TestcaseResultService } from '../testcase-result/testcase-result.service';
import { ProblemsService } from '../problems/problems.service';
import { LeaderBoardsService } from '../leader-boards/leader-boards.service';

@Injectable()
export class SubmissionsService extends BaseService<Submission> {
  constructor(
    readonly repository: SubmissionRepository,
    private readonly runnerService: RunnerService,
    private readonly testcasesService: TestcasesService,
    private readonly testcaseResultsService: TestcaseResultService,
    private readonly problemsService: ProblemsService,
    private readonly leaderBoardsService: LeaderBoardsService
  ) {
    super(repository)
  }

  async isUserInContest(userId: number, problemId: number) {
    const problem = await this.problemsService.findByCondition({
      where: {
        id: problemId
      },
      relations: ['contest', 'contest.participants']
    })


    const contest = problem.contest || null
    if (!contest) return false
    if (contest.status !== 'ONGOING') return false
    if (!contest.participants.some(participant => participant.id === userId)) return false
    return true
  }

  async createAndSave(dto: CreateSubmissionDto) {
    const problem = await this.problemsService.findByCondition({
      where: {
        id: dto.problemId,
      },
      relations: ['contest', 'contest.participants']
    })

    if (!problem) throw new NotFoundException('Problem not found!')

    const createdSubmission = this.repository.create({
      ...dto,
      problem: problem,
      user: { id: dto.userId }
    })
    const savedSubmission = await this.repository.save(createdSubmission)

    // get all testcases by problemId
    const testcases: Testcase[] = await this.testcasesService.findAll({
      where: {
        problem: { id: dto.problemId }
      }
    });

    const formattedTestcases: RunnerTestCase[] = testcases.map((testcase, index) => {
      return {
        order: index + 1, // Bắt đầu từ 1, nếu muốn từ 0 thì giữ nguyên index
        input: testcase.input,
        expected: testcase.output,
        timeLimit: problem.timeLimit,
        memoryLimit: problem.memoryLimit
      };
    });

    const result: RunnerTestCase[] = await this.runnerService.run(dto.language, dto.code, formattedTestcases);
    let totalTime = 0;
    let totalMemory = 0;
    let acceptedCount = 0;

    for (let i = 0; i < result.length; i++) {

      totalTime += result[i].executionTime;
      totalMemory += result[i].memoryUsed;
      acceptedCount++;

      if (result[i].status !== Status.ACCEPTED) {
        savedSubmission.status = result[i].status;
        savedSubmission.executionTime = result[i].executionTime;
        savedSubmission.memoryUsed = result[i].memoryUsed;
        savedSubmission.errorMessage = result[i].errorMessage
      }

      const createdTestcaseResult = this.testcaseResultsService.create({
        submission: savedSubmission,
        status: result[i].status,
        order: i + 1
      })
      await this.testcaseResultsService.save(createdTestcaseResult)
    }

    if (savedSubmission.status === Status.PENDING) {
      savedSubmission.status = Status.ACCEPTED;
    }

    // Lấy trung bình nếu tất cả test case đều ACCEPTED
    if (acceptedCount > 0) {
      savedSubmission.executionTime = totalTime / acceptedCount;
      savedSubmission.memoryUsed = totalMemory / acceptedCount;
    }

    const isInContest = await this.isUserInContest(dto.userId, dto.problemId)

    if (isInContest) {

      savedSubmission.contest = problem.contest

      // lấy leaderboard của người dùng
      const leaderboard = await this.leaderBoardsService.findByCondition({
        where: {
          user: { id: dto.userId },
          contest: { id: problem.contest.id }
        }
      })

      const submissionAccepted = await this.repository.findByCondition({
        where: {
          user: { id: dto.userId },
          status: Status.ACCEPTED,
          problem: { id: dto.problemId },
        }
      })

      savedSubmission.isPublic = false
      if (savedSubmission.status === Status.ACCEPTED) {
        if (!submissionAccepted) {
          leaderboard.score += problem.rankScore
          problem.rankScore -= problem.rankScore * 0.01
        }
      }

      if (savedSubmission.status === Status.WRONG_ANSWER) {
        if (!submissionAccepted) leaderboard.score -= leaderboard.score * 0.01
      }

      await this.leaderBoardsService.save(leaderboard)
      await this.problemsService.save(problem)
    }
    return await this.repository.save(savedSubmission);
  }
}
