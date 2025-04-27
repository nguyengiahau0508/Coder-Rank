import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './tag.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag])
  ],
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  exports: [TagsService]
})
export class TagsModule { }
