import {Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, UploadedFiles, UploadedFile, UseInterceptors, Req} from '@nestjs/common';
import {ContestsService} from './contests.service';
import {JwtAuthGuard} from 'src/authentications/guard/jwt.juard';
import {Roles} from 'src/common/decorators/roles.decorator';
import {Role} from 'src/common/enums/authentication/role.enum';
import {GoogleDriveService} from 'src/integrations/google-drive/google-drive.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {Contest, ContestStatus} from './entities/contest.entity';
import {PageOptionsDto} from 'src/common/shared/pagination/dtos';
import {ILike, In} from 'typeorm';
import {LeaderBoardsService} from '../leader-boards/leader-boards.service';
import {RolesGuard} from 'src/authentications/guard/role.guard';

@Controller('contests')
export class ContestsController {
	constructor(
		private readonly contestsService: ContestsService,
		private readonly leaderBoardsService: LeaderBoardsService,
		private readonly googleDriveService: GoogleDriveService,
	) {}

	@Post('admin')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Req() req: any,
		@UploadedFile() file: Express.Multer.File,
	) {
		const data: Contest = JSON.parse(req.body.data);

		if (file) {
			const fileId = await this.googleDriveService.uploadFile(file);
			data.image = `https://drive.google.com/thumbnail?id=${fileId}`;
			data.fileId = fileId;
		}

		return {
			data: await this.contestsService.save(data)
		};
	}

	@Get('admin')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	findAllByAdmin(
		@Query() pageOptionsDto: PageOptionsDto,
		@Query('status') status?: ContestStatus,
		@Query('searchTerm') searchTerm?: string,
	) {
		const where: any = [];

		if (status) {
			where.push({status});
		}

		if (searchTerm) {
			const orConditions = [];

			// Nếu searchTerm là số → tìm theo ID
			if (!isNaN(Number(searchTerm))) {
				orConditions.push({id: Number(searchTerm)});
			}

			// Nếu searchTerm là chuỗi → tìm theo tên contest
			orConditions.push(
				{title: ILike(`%${searchTerm}%`)},
			);

			for (const condition of orConditions) {
				where.push({...condition});
			}
		}

		return this.contestsService.getAll(pageOptionsDto, {where, order: {createdAt: 'DESC'}});
	}

	@Get('finished')
	findAll(
		@Query() pageOptionsDto: PageOptionsDto,
	) {
		return this.contestsService.getAll(pageOptionsDto, {
			where: {
				status: ContestStatus.FINISHED,
			},
			order: {
				createdAt: 'DESC'
			}
		})
	}

	@Get('upcoming')
	findUpcoming(
		@Query() pageOptionsDto: PageOptionsDto,
	) {
		return this.contestsService.getAll(pageOptionsDto, {
			where: {
				status: In([ContestStatus.UPCOMING, ContestStatus.ONGOING]),
			},
			order: {
				startTime: 'ASC'
			}
		})
	}

	@Get('ongoing')
	findOngoing(
		@Query() pageOptionsDto: PageOptionsDto,
	) {
		return this.contestsService.getAll(pageOptionsDto, {
			where: {
				status: ContestStatus.ONGOING,
			},
			order: {
				endTime: 'ASC'
			}
		})
	}

	@Get(':id/admin')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async findOneByAdmin(@Param('id') id: string) {
		return {
			data: await this.contestsService.findByCondition({
				where: {id: Number(id)},
				relations: {
					problems: true
				}
			})
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const contest = await this.contestsService.findByCondition({
			where: {id: Number(id)},
			relations: {
				problems: true,
			},
		});

		if (contest) {
			contest.problems = contest.problems.filter(problem => problem.isPublic);
		}

		return {data: contest};
	}

	@Post(':id/register')
	@UseGuards(JwtAuthGuard)
	async registerContest(
		@Param('id') id: number,
		@Req() req: any) {
		const userId = Number(req.user.sub);
		const contest = await this.contestsService.findByCondition({
			where: {id},
			relations: {
				participants: true,
			},
		});

		if (!contest) {
			return {
				message: 'Contest not found!'
			}
		}

		if (contest.participants.some(participant => participant.id === userId)) {
			return {
				data: contest,
				message: 'You have already registered for this contest!'
			}
		}

		const oldRating = await this.leaderBoardsService.findAll({
			where: {
				user: {id: userId},
			},
			order: {
				updatedAt: 'DESC',
			},
			take: 1,
		})[0]?.newRating || 0;

		await this.leaderBoardsService.save({
			user: {id: userId},
			contest: {id},
			oldRating
		})

		return {
			data: await this.contestsService.save({
				...contest,
				participants: [...contest.participants, {id: userId}],
			})
		}
	}

	@Get(':id/is-registered')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.User)
	async isRegisteredContest(
		@Param('id') id: number,
		@Req() req: any) {
		const userId = Number(req.user.sub);
		const contest = await this.contestsService.findByCondition({
			where: {id},
			relations: {
				participants: true,
			},
		});
		return {
			data: contest.participants.some(participant => participant.id === userId)
		}
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@UseInterceptors(FileInterceptor('file'))
	async update(
		@Param('id') id: string,
		@Req() req: any,
		@UploadedFile() file: Express.Multer.File,
	) {
		const existingContest = await this.contestsService.findByCondition({
			where: {id: Number(id)},
		})
		const data: Contest = JSON.parse(req.body.data);
		if (file) {
			if (existingContest.fileId) {
				await this.googleDriveService.deleteFile(existingContest.fileId);
			}
			const fileId = await this.googleDriveService.uploadFile(file);
			data.image = `https://drive.google.com/thumbnail?id=${fileId}`;
			data.fileId = fileId;
		}
		return {
			data: await this.contestsService.save(data)
		}
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.contestsService.remove(+id);
	// }
}
