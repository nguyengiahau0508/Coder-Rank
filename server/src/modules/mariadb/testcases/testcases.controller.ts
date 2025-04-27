import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';
import { PageOptionsDto } from 'src/common/shared/pagination/dtos';
import { JwtAuthGuard } from 'src/authentications/guard/jwt.juard';
import { Testcase } from './entities/testcase.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/authentication/role.enum';

@Controller('testcases')
export class TestcasesController {
  constructor(private readonly testcasesService: TestcasesService) { }

  @Post('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async create(@Body() data: Testcase) {
    return {
      data: await this.testcasesService.save(data)
    }
  }

  @Get()
  findAll() {
    return this.testcasesService.findAll();
  }


  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async findAllByAdmin(
    @Query() pageOptionDto: PageOptionsDto,
    @Query('problemId') problemId: number,
    @Query('isSample') isSample?: string,
  ) {
    const where: any = {
      problem: { id: problemId }
    };

    if (isSample === 'true') {
      where.isSample = true;
    } else if (isSample === 'false') {
      where.isSample = false;
    }
    // nếu isSample === '' hoặc undefined thì không thêm vào where

    return await this.testcasesService.getAll(pageOptionDto, {
      where,
      select: {
        id: true,
        input: true,
        output: true,
        isSample: true,
      },
    });
  }

  // // create many testcase for problem, but if testcase exist, it will be updated
  // @Post('admin')
  // @UseGuards(JwtAuthGuard)
  // async createMany(
  //   @Body() createTestcaseDto: Testcase[],
  // ) {
  //   const saved = await this.testcasesService.saveMany(createTestcaseDto);
  //   if (saved) {
  //     return {
  //       data: { status: true, message: "Create many testcases successfully" },
  //     }
  //   }
  //   return {
  //     data: { status: false, message: "Create many testcases failed" },
  //   }
  // }

  @Get('problem/:problemId/sample')
  async getTestcaseSampleByProblemId(@Param('problemId') problemId: number) {
    return {
      data: await this.testcasesService.findAll({
        where: {
          problem: { id: problemId },
          isSample: true
        },
        select: ["id", "input", 'output'],
      })
    }
  }

  @Get('problem/:problemId/total')
  async getTotalTestcaseByProblemId(
    @Param('problemId') problemId: number,
  ) {
    return {
      data: await this.testcasesService.count({
        where: {
          problem: { id: problemId }
        }
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testcasesService.findOneById(+id);
  }

  @Patch(':id/admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() updateTestcaseDto: UpdateTestcaseDto) {
    return this.testcasesService.update(+id, updateTestcaseDto);
  }

  @Delete(':id/admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: number) {
    const exist = await this.testcasesService.findOneById(+id);
    return this.testcasesService.remove(exist);
  }
}
