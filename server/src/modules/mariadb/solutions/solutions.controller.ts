import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { Solution } from './entities/solution.entity';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Body() data: Solution
  ) {
    return {
      data: await this.solutionsService.save({
        ...data,
        user: { id: req.user.sub },
      })
    }
  }

  @Get()
  findAll(
    @Query() pageOptionDto: PageOptionsDto,
    @Query("tagIds") tagIds?: string | string[],
    @Query("problemId") problemId?: number,
    @Query("sortBy") sortBy: 'votes' | 'views' | 'createdAt' = 'createdAt',
  ) {
    const parsedTagIds: number[] = tagIds
      ? Array.isArray(tagIds)
        ? tagIds.map(Number) // Nếu là mảng, ép kiểu từng phần tử
        : [Number(tagIds)] // Nếu là chuỗi, tạo mảng với một phần tử
      : [];
    return this.solutionsService.getByConditionWithPagination(pageOptionDto, problemId, parsedTagIds, sortBy);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.solutionsService.findByCondition({
        where: { id: +id },
        relations: {
          user: true,
          tags: true,
          problem: true,
          comments: {
            user: true, // lấy thêm user trong comment
            replies: {
              user: true, // nếu muốn lấy luôn user của replies
            },
            parentComment: true
          },
        },
      })
    };

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionsService.update(+id, updateSolutionDto);
  }

}
