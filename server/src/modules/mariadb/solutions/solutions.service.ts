import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Solution } from './entities/solution.entity';
import { SolutionRepository } from './solution.repository';
import { PageMetaDto } from 'src/common/shared/pagination/page-meta.dto';
import { PageDto } from 'src/common/shared/pagination/page.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class SolutionsService extends BaseService<Solution> {
  constructor(
    readonly repository: SolutionRepository
  ) { super(repository) }

  public async getByConditionWithPagination(
    pageOptionsDto: any,
    problemId: number,
    tagIds: number[] = [],
    sortBy: 'votes' | 'views' | 'createdAt' = 'createdAt',
  ) {

    const queryBuilder = this.repository.createQueryBuilder("solution");
    queryBuilder
      .leftJoin("solution.user", "user")
      .addSelect(["user.name", "user.avatar"]);

    // Join tags để lấy chi tiết
    queryBuilder.leftJoinAndSelect("solution.tags", "tag");

    // Nếu có lọc theo tag
    if (tagIds.length > 0) {
      queryBuilder.andWhere("tag.id IN (:...tagIds)", { tagIds });
    }

    queryBuilder.andWhere("solution.problemId = :problemId", { problemId });

    if (sortBy === 'votes') {
      queryBuilder.orderBy("solution.votes", "DESC");
    }
    else if (sortBy === 'views') {
      queryBuilder.orderBy("solution.views", "DESC");
    }
    else {
      queryBuilder.orderBy("solution.createdAt", pageOptionsDto.order || "DESC");
    }

    const itemCount = await queryBuilder.getCount();

    const entities = await queryBuilder
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take)
      .getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
