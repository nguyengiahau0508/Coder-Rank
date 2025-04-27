import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Difficulty, Problem } from './entities/problem.entity';
import { ProblemRepository } from './problem.repository';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { PageDto } from 'src/common/shared/pagination/page.dto';
import { PageMetaDto } from 'src/common/shared/pagination/page-meta.dto';

@Injectable()
export class ProblemsService extends BaseService<Problem> {
  constructor(
    repository: ProblemRepository
  ) {
    super(repository)
  }

  public async getByConditionWithPagination(
    pageOptionsDto: PageOptionsDto,
    tagIds: number[] = [],
    difficulty: Difficulty | null = null
  ) {
    const queryBuilder = this.repository.createQueryBuilder("problem");

    // Join tags để lấy chi tiết
    queryBuilder.leftJoinAndSelect("problem.tags", "tag");

    // Nếu có lọc theo tag
    if (tagIds.length > 0) {
      queryBuilder.andWhere("tag.id IN (:...tagIds)", { tagIds });
    }

    // Lọc theo độ khó nếu có
    if (difficulty) {
      queryBuilder.andWhere("problem.difficulty = :difficulty", { difficulty });
    }

    // Chỉ lấy problem công khai
    queryBuilder.andWhere("problem.isPublic = :isPublic", { isPublic: true });

    // Đếm tổng số bản ghi trước khi phân trang
    const itemCount = await queryBuilder.getCount();

    // Lấy dữ liệu phân trang
    const entities = await queryBuilder
      .orderBy("problem.createdAt", pageOptionsDto.order || "DESC")
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take)
      .getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

}
