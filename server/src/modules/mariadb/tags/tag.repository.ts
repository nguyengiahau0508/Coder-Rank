import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/common/shared/mariadb/repositories/base.abstract.repository";
import { Tag } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TagRepository extends BaseAbstractRepository<Tag> {
  constructor(
    @InjectRepository(Tag) private readonly repository: Repository<Tag>
  ) { super(repository) }
}
