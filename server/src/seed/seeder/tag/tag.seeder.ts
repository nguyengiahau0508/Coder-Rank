import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "src/modules/mariadb/tags/dto/create-tag.dto";
import { TagsService } from "src/modules/mariadb/tags/tags.service";
import { sampleTags } from "./tags-sample";

@Injectable()
export class TagSeeder {
  private readonly tags: CreateTagDto[] = sampleTags
  constructor(
    private readonly tagsService: TagsService
  ) { }

  public async seed() {
    const exists = await this.tagsService.findAll()
    if (exists.length == 0)
      await this.tagsService.saveMany(this.tags);
    console.log('✅ Tag seeding done!');
  }
}
