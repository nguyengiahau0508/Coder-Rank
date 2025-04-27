import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { Difficulty, Problem } from './entities/problem.entity';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/authentication/role.enum';
import { ILike } from 'typeorm';

@Controller('problems')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
  ) { }

  @Post('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async create(
    @Body() createProblemDto: Problem, @Req() req: any,
  ) {
    return {
      data: await this.problemsService.save({
        ...createProblemDto,
        userId: req.user.sub,
      })
    }
  }

  @Get()
  async findAll(
    @Query() pageOptionDto: PageOptionsDto,
    @Query("tagIds") tagIds?: string | string[],
    @Query("difficulty") difficulty?: Difficulty | null
  ) {
    const parsedTagIds: number[] = tagIds
      ? Array.isArray(tagIds)
        ? tagIds.map(Number) // Nếu là mảng, ép kiểu từng phần tử
        : [Number(tagIds)] // Nếu là chuỗi, tạo mảng với một phần tử
      : [];
    return await this.problemsService.getByConditionWithPagination(pageOptionDto, parsedTagIds, difficulty)
  }

  @Get('contest/:contestId')
  async findAllByContestId(
    @Param('contestId') contestId: number,
  ) {
    return {
      data: await this.problemsService.findAll({
        where: {
          contest: {
            id: contestId,
          },
        },
        select: {
          id: true,
          title: true,
        }
      })
    }
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async findAllAdmin(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('isPublic') isPublic?: string,
    @Query('searchTerm') searchTerm?: string,
  ) {
    const where: any[] = [];

    let publicCondition: any = {};
    if (isPublic === 'true' || isPublic === 'false') {
      publicCondition.isPublic = isPublic === 'true';
    }

    if (searchTerm) {
      const orConditions: any[] = [];

      if (!isNaN(Number(searchTerm))) {
        orConditions.push({ id: Number(searchTerm) });
      }

      orConditions.push(
        { title: ILike(`%${searchTerm}%`) },
        { difficulty: ILike(`%${searchTerm}%`) },
      );

      for (const condition of orConditions) {
        where.push({ ...publicCondition, ...condition });
      }
    } else if (Object.keys(publicCondition).length > 0) {
      where.push(publicCondition);
    }

    // Nếu không có điều kiện nào, tức là isPublic rỗng và không có searchTerm
    const finalWhere = where.length > 0 ? where : {};

    return await this.problemsService.getAll(pageOptionsDto, {
      where: finalWhere, // TypeORM hiểu array là OR
      order: {
        createdAt: 'DESC',
      },
      relations: {
        tags: true,
      },
      select: {
        id: true,
        title: true,
        difficulty: true,
        timeLimit: true,
        memoryLimit: true,
        isPublic: true,
        createdAt: true
      },
    });
  }


  @Get('private/admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async findAllProblemPrivateByAdmin(
    @Query('searchTerm') searchTerm?: string,
  ) {
    const where: any = [{
      isPublic: false,
      isInContest: false,
    }];

    if (searchTerm) {
      const orConditions = [];

      // Nếu searchTerm là số → tìm theo ID
      if (!isNaN(Number(searchTerm))) {
        orConditions.push({ id: Number(searchTerm) });
      }

      orConditions.push(
        { title: ILike(`%${searchTerm}%`) },
        { difficulty: ILike(`%${searchTerm}%`) },
      );
    }
    return {
      data: await this.problemsService.findAll({
        where, // TypeORM hiểu array là OR
        select: {
          id: true,
          title: true,
          difficulty: true,
        },
      })
    }
  }


  @Put(':id/contest-status')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async toggleContestStatus(
    @Param('id') id: number,
  ) {
    const problem = await this.problemsService.findOneById(id);
    if (!problem) {
      return {
        message: 'Problem not found',
      };
    }

    problem.isInContest = !problem.isInContest;
    await this.problemsService.save(problem);
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      data: await this.problemsService.findByCondition({
        where: {
          id: id,
        },
        relations: {
          tags: true,
        }
      })
    }
  }

  @Get('get-problem-title/:id')
  async getProblemTitleById(@Param('id') id: number) {
    return {
      data: (await this.problemsService.findOneById(id)).title
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() updateProblemDto: UpdateProblemDto) {
    const problem = await this.problemsService.findOneById(id)
    if (!problem) {
      return {
        message: 'Problem not found'
      }
    }
    return {
      data: await this.problemsService.save(updateProblemDto)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
