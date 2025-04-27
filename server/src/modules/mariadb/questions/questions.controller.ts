import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/authentication/role.enum';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async create(@Body() data: Lesson) {
    return {
      data: await this.questionsService.save(data),
    }
  }

  @Get()
  async findAll(
    @Query('lessonId') lessonId: number,
  ) {
    return {
      data: await this.questionsService.findAll({
        where: {
          lesson: {
            id: lessonId,
          }
        }
      }),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.questionsService.findOneById(+id),
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Question) {
    const exists = await this.questionsService.findOneById(id);
    if (!exists) {
      return {
        message: 'Question not found',
      }
    }

    return {
      data: await this.questionsService.save(data),
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const exists = await this.questionsService.findOneById(+id);
    if (!exists) {
      return {
        message: 'Question not found',
      }
    }
    return {
      data: await this.questionsService.remove(exists),
    }
  }
}
