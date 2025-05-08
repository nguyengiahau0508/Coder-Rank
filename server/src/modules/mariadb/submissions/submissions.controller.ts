import {Controller, Get, Post, Body, Patch, Param, UseGuards, Req, Query, BadRequestException} from '@nestjs/common';
import {SubmissionsService} from './submissions.service';
import {CreateSubmissionDto} from './dto/create-submission.dto';
import {UpdateSubmissionDto} from './dto/update-submission.dto';
import {AuthGuard} from '@nestjs/passport';
import {AuthProviders} from 'src/common/enums/authentication/auth.enum';
import {Roles} from 'src/common/decorators/roles.decorator';
import {Role} from 'src/common/enums/authentication/role.enum';
import {PageOptionsDto} from 'src/common/shared/pagination/dtos';
import {Status} from 'src/common/enums/database/mariadb/db-tables';
import {Between} from 'typeorm';
import {JwtAuthGuard} from 'src/authentications/guard/jwt.juard';
import {RolesGuard} from 'src/authentications/guard/role.guard';

@Controller('submissions')
export class SubmissionsController {
	constructor(private readonly submissionsService: SubmissionsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.User)
	async create(@Req() req: any, @Body() createSubmissionDto: CreateSubmissionDto) {
		createSubmissionDto.userId = req.user.sub
		return {data: await this.submissionsService.createAndSave(createSubmissionDto)};
	}

	@Get()
	async findAll(
		@Query() pageOptionDto: PageOptionsDto,
	) {
		return await this.submissionsService.getAll(pageOptionDto, {
			where: {
				isPublic: true
			},
			select: {
				id: true,
				language: true,
				status: true,
				executionTime: true,
				memoryUsed: true,
				createdAt: true,
				user: {username: true},
				problem: {id: true, title: true}
			},
			order: {
				createdAt: 'DESC'
			},
			relations: ['user', 'problem']
		})
	}

	@Get('last-correct/problem/:problemId')
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	async getLastCorrectSubmission(
		@Req() req: any,
		@Param('problemId') problemId: number
	) {
		return {
			data: await this.submissionsService.findByCondition({
				where: {
					user: {id: req.user.sub},
					status: Status.ACCEPTED,
					problem: {id: problemId}
				}
			})
		}
	}

	@Get('all-in-year')
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	async findAllInYear(@Req() req: any, @Query('year') year: number) {
		const yearNumber = parseInt(year.toString(), 10);
		if (isNaN(yearNumber) || !Number.isInteger(yearNumber) || yearNumber < 1970) {
			throw new BadRequestException('Invalid year');
		}

		const startDate = new Date(Date.UTC(yearNumber, 0, 1));
		const endDate = new Date(Date.UTC(yearNumber + 1, 0, 1));

		// Lấy tất cả submissions, bao gồm problem_id
		const submissions = await this.submissionsService.findAll({
			where: {
				user: {id: req.user.sub},
				status: Status.ACCEPTED,
				createdAt: Between(startDate, endDate),
			},
			order: {
				createdAt: 'DESC',
			},
			select: {
				createdAt: true,
				problem: {id: true}, // Lấy thêm problem.id
			},
			relations: ['problem'], // Tải quan hệ problem
		});

		// Lọc trùng lặp trong code
		const uniqueSubmissions = [];
		const seenProblemIds = new Set<number>();
		for (const sub of submissions) {
			if (!seenProblemIds.has(sub.problem.id)) {
				seenProblemIds.add(sub.problem.id);
				uniqueSubmissions.push({createdAt: sub.createdAt});
			}
		}

		return {
			data: uniqueSubmissions,
		};
	}



	@Get('user/:userId/problem/:problemId')
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	@Roles(Role.User)
	async getUserSubmissionsForProblem(
		@Query() pageOptionDto: PageOptionsDto,
		@Param('userId') userId: number,
		@Param('problemId') problemId: number,
		@Req() req: any
	) {
		if (req.user.sub != userId) return {data: []}
		return await this.submissionsService.getAll(pageOptionDto, {
			where: {
				user: {id: userId},
				problem: {id: problemId},
			},
			order: {
				createdAt: 'DESC'
			},
			select: ['id', 'language', 'status', 'executionTime', 'memoryUsed', 'createdAt'],
		})
	}

	@Get(':id/user/:userId/')
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	@Roles(Role.User)
	async getUserSubmissionsDetailForProblem(
		@Param('id') id: number,
		@Param('userId') userId: number,
		@Req() req: any
	) {
		if (req.user.sub != userId) return {data: {}};
		return {
			data: await this.submissionsService.findByCondition({
				where: {id: id},
				select: {
					id: true,
					language: true,
					executionTime: true,
					memoryUsed: true,
					errorMessage: true,
					status: true,
					code: true,
					createdAt: true,
				},
				relations: {
					testcaseResults: true,
				}
			}),
		};
	}


	@Get('status')
	async getSubmissionStatus(
		@Query('contestId') contestId: number,
		@Query('userId') userId: number,
		@Query('problemId') problemId: number,
	) {
		const submissions = await this.submissionsService.findAll({
			where: {
				contest: {id: contestId},
				user: {id: userId},
				problem: {id: problemId}
			},
			select: {
				status: true
			}, // chỉ lấy field cần thiết
		});

		const totalSubmissions = submissions.length;

		if (submissions.some(sub => sub.status === Status.ACCEPTED)) {
			return {data: {status: Status.ACCEPTED, total: totalSubmissions}};
		}

		if (totalSubmissions > 0) {
			const latestSubmission = submissions[0];
			return {data: {status: latestSubmission.status, total: totalSubmissions}};
		}

		return {data: {status: Status.PENDING, total: totalSubmissions}};
	}

	@Get('/problem/:problemId')
	async getSubmissionsForProblem(
		@Param('problemId') problemId: number,
	) {
		return {
			data: await this.submissionsService.findAll({
				where: {
					problem: {id: problemId},
					isPublic: true
				},
				order: {
					createdAt: 'DESC'
				},
				select: ['id', 'language', 'status', 'executionTime', 'memoryUsed', 'createdAt'],
			})
		}
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.submissionsService.findByCondition({
			where: {
				id: id
			}
		});
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
		return this.submissionsService.update(+id, updateSubmissionDto);
	}
}
