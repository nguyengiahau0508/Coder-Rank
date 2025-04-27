import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseRepository } from './course.repository';
import { GoogleDriveModule } from 'src/integrations/google-drive/google-drive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), GoogleDriveModule],
  controllers: [CoursesController],
  providers: [CoursesService, CourseRepository],
  exports: [CoursesService],
})
export class CoursesModule { }
