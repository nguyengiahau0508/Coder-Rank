import { Injectable } from "@nestjs/common";
import { CoursesService } from "src/modules/mariadb/courses/courses.service";
import { Course } from "src/modules/mariadb/courses/entities/course.entity";
import { coursesSample } from "./courses-sample";


@Injectable()
export class CoursesSeeder {
  constructor(
    private readonly courseService: CoursesService
  ) { }

  private readonly data: Partial<Course>[] = coursesSample

  public async seed() {
    const existingCourses = await this.courseService.findAll();
    if (existingCourses.length === 0) {
      await this.courseService.saveMany(this.data);
    }

    console.log('✅ Course seeding done!');
  }
}
