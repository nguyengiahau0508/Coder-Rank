import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionRepository } from './solution.repository';
import { Solution } from './entities/solution.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solution])
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionRepository],
})
export class SolutionsModule { }
