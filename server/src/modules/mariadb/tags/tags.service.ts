import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    readonly repository: TagRepository
  ) {
    super(repository)
  }
}
