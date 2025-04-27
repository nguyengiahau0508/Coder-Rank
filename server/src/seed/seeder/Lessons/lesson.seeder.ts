import { Injectable } from "@nestjs/common";
import { Lesson } from "src/modules/mariadb/lessons/entities/lesson.entity";
import { LessonsService } from "src/modules/mariadb/lessons/lessons.service";
import { sampleLesson } from "./lesson-sample";


@Injectable()
export class LessonsSeeder {
  constructor(
    private readonly lessonsService: LessonsService
  ) { }

  private readonly data: Partial<Lesson>[] = sampleLesson

  public async seed() {
    const existingLessons = await this.lessonsService.findAll();
    if (existingLessons.length === 0) {
      await this.lessonsService.saveMany(this.data);
    }

    console.log('✅ Lesson seeding done!');
  }
}
