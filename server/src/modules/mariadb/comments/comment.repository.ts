import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Comment } from "./entities/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CommentRepository extends BaseAbstractRepository<Comment> {
  constructor(
    @InjectRepository(Comment) private readonly repository: Repository<Comment>
  ) {
    super(repository);
  }
}
