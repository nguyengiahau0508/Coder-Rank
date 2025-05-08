import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import {AnswersService} from './answers.service';
import {JwtAuthGuard} from 'src/authentications/guard/jwt.juard';
import {Answer} from './entities/answer.entity';
import {Roles} from 'src/common/decorators/roles.decorator';
import {Role} from 'src/common/enums/authentication/role.enum';
import {RolesGuard} from 'src/authentications/guard/role.guard';

@Controller('answers')
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async create(@Body() data: Answer) {
		return {
			data: await this.answersService.save(data),
		}
	}

	@Get()
	findAll(
		@Query('questionId') questionId: number,
	) {
		return this.answersService.findAll({
			where: {
				question: {
					id: questionId
				}
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.answersService.findOneById(+id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	update(@Param('id') id: string, @Body() data: Answer) {
		const existingAnswer = this.answersService.findOneById(+id);
		if (!existingAnswer) {
			return {message: 'Answer not found'};
		}

		return {
			data: this.answersService.save(data),
		}
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async remove(@Param('id') id: string) {
		const existingAnswer = await this.answersService.findOneById(+id);
		if (!existingAnswer) {
			return {message: 'Answer not found'};
		}

		return {
			data: await this.answersService.remove(existingAnswer),
		}
	}
}
