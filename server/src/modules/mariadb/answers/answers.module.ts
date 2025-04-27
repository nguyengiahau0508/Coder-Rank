import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswersRepository } from './answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer])
  ],
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository],
})
export class AnswersModule { }
