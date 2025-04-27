import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Contest, ContestStatus } from './entities/contest.entity';
import { ContestRepository } from './contests.repository';
import { Cron } from '@nestjs/schedule';
import { In } from 'typeorm';
import { ProblemsService } from '../problems/problems.service';

@Injectable()
export class ContestsService extends BaseService<Contest> {
  constructor(
    readonly repository: ContestRepository,
    private readonly problemsService: ProblemsService,
  ) { super(repository) }

  //auto update contest status

  @Cron('*/5 * * * * *') // mỗi 5 giây
  async updateStatuses() {
    const now = new Date();
    const contests = await this.repository.findAll({
      where: {
        status: In([ContestStatus.UPCOMING, ContestStatus.ONGOING]),
      },
      relations: { problems: true }
    });

    for (const contest of contests) {
      let newStatus: ContestStatus;

      if (now < contest.startTime) newStatus = ContestStatus.UPCOMING;
      else if (now > contest.endTime) {
        newStatus = ContestStatus.FINISHED;
      }
      else {
        newStatus = ContestStatus.ONGOING
        for (const problem of contest.problems) {
          problem.isPublic = true;
          await this.problemsService.save(problem); // 👈 Lưu từng problem
        }
      };

      if (contest.status !== newStatus) {
        contest.status = newStatus;
        await this.repository.save(contest);
      }
    }
  }


  @Cron('0 */10 * * * *') // mỗi 10 phút
  async autoCalculateRanks() {
    const contests = await this.repository.findAll({
      where: {
        status: ContestStatus.FINISHED,
        isRankCalculated: false,
      },
      relations: { leaderBoards: { user: true }, problems: true }
    });

    for (const contest of contests) {

      const boards = contest.leaderBoards;

      // Gán rating mặc định nếu chưa có
      boards.forEach(b => {
        b.oldRating = b.oldRating || 1400;
      });

      // Sắp xếp theo score giảm dần (xếp hạng)
      boards.sort((a, b) => b.score - a.score);
      boards.forEach((b, index) => {
        b.rank = index + 1;
      });

      const K = 40;
      const N = boards.length;

      for (const i of boards) {
        let expectedRank = 1;
        for (const j of boards) {
          if (i.id === j.id) continue;
          expectedRank += 1 / (1 + Math.pow(10, (j.oldRating - i.oldRating) / 400));
        }

        const actualRank = i.rank!;
        const diff = expectedRank - actualRank;
        const delta = Math.round((K * diff) / N);
        i.newRating = i.oldRating + delta;
      }

      // Đánh dấu contest đã tính điểm
      contest.isRankCalculated = true;

      // Lưu lại bảng xếp hạng
      await this.repository.save(contest);
      console.log(`✔ Finished calculating ranks for contest ${contest.id}`);
    }
  }

}
