import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Role } from 'src/common/enums/authentication/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { Course } from '../courses/entities/course.entity';
import { ILike } from 'typeorm';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async create(@Body() data: Lesson) {
    return {
      data: await this.lessonsService.save(data),
    }
  }

  @Get('course/:courseId')
  async findAll(
    @Param('courseId') courseId: number,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('searchTerm') searchTerm: string,
  ) {
    const where = {}
    if (searchTerm && searchTerm.length > 0) {
      where['title'] = ILike(`%${searchTerm}%`);
    }

    return this.lessonsService.getAll(pageOptionsDto, {
      where: {
        ...where,
        course: { id: courseId }
      },
      select: {
        id: true,
        title: true,
        order: true,
      },
      order: {
        order: 'ASC',
      }
    })
  }

  //get the last lesson of a course by order
  @Get('course/:courseId/last')
  async getLastLessonByCourseId(@Param('courseId') id: number) {
    const data = await this.lessonsService.findAll({
      where: {
        course: { id: id }
      },
      order: {
        order: 'DESC',
      },
    })
    return {
      data: data[0]
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      data: await this.lessonsService.findByCondition({
        where: {
          id: id,
        },
        relations: {
          questions: true,
        }
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Course) {
    const existingLesson = await this.lessonsService.findOneById(id);
    if (!existingLesson) {
      throw new Error('Lesson not found');
    }

    return {
      data: await this.lessonsService.save(data),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingLesson = await this.lessonsService.findOneById(id);
    if (!existingLesson) {
      throw new Error('Lesson not found');
    }

    await this.lessonsService.remove(existingLesson);
  }
}
