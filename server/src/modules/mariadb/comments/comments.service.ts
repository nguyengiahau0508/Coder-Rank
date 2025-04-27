import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/shared/mariadb/base.service';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentsService extends BaseService<Comment>{
  constructor(
    readonly repository: CommentRepository,
  ){
    super(repository);
  }
}
