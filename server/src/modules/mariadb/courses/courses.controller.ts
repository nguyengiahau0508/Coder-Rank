import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Delete, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { ILike } from 'typeorm';
import { Course } from './entities/course.entity';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Role } from 'src/common/enums/authentication/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from 'src/integrations/google-drive/google-drive.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly googleDriveService: GoogleDriveService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: Course = JSON.parse(req.body.data);

    if (file) {
      const fileId = await this.googleDriveService.uploadFile(file);
      data.imageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
      data.fileId = fileId;
    }

    return {
      data: await this.coursesService.save(data),
    }
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('searchTerm') searchTerm: string,
  ) {
    const where = {}
    if (searchTerm && searchTerm !== '') {
      where['title'] = ILike(`%${searchTerm}%`)
    }
    return await this.coursesService.getAll(pageOptionsDto, {
      where,
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
      order: {
        createdAt: 'DESC',
      }
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.coursesService.findOneById(id),
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: Course = JSON.parse(req.body.data);
    const existingCourse = await this.coursesService.findOneById(id);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    if (file) {
      if (existingCourse.fileId) await this.googleDriveService.deleteFile(existingCourse.fileId);
      const fileId = await this.googleDriveService.uploadFile(file);
      data.imageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
      data.fileId = fileId;
    }
    return {
      data: await this.coursesService.save(data),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingCourse = await this.coursesService.findOneById(id);
    if (!existingCourse) throw new Error('Course not found');

    if (existingCourse.fileId) this.googleDriveService.deleteFile(existingCourse.fileId);

    return {
      data: await this.coursesService.remove(existingCourse),
    }
  }
}
