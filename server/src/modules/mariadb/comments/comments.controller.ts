import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Body() data: Comment
  ) {
    return {
      data: await this.commentsService.save({
        ...data,
        user: {
          id: req.user.sub,
        }
      })
    }
  }

  @Get('solution/:solutionId')
  async findAllBySolutionId(
    @Param('solutionId') solutionId: number,
    @Query() pageOptionDto: PageOptionsDto,
  ) {
    return await this.commentsService.getAll(pageOptionDto, {
      where: {
        solution: {
          id: solutionId
        }
      },
      relations: {
        user: true,
        parentComment: true,
        replies: true
      }
    });
  }

  @Get('root/:rootId')
  async findAllByParrentId(
    @Param('rootId') rootId: number,
    @Query() pageOptionDto: PageOptionsDto,
  ) {
    return await this.commentsService.getAll(pageOptionDto, {
      where: {
        parentComment: {
          id: rootId
        }
      },
      relations: {
        user: true,
        parentComment: {
          user: true
        },
        replies: true
      }
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.commentsService.findOneById(+id)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const exists = await this.commentsService.findOneById(+id);
    if (!exists) {
      return { message: 'Comment not found' };
    }

    return {
      data: await this.commentsService.remove(exists)
    }
  }
}
