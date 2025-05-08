import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req} from '@nestjs/common';
import {LeaderBoardsService} from './leader-boards.service';
import {CreateLeaderBoardDto} from './dto/create-leader-board.dto';
import {UpdateLeaderBoardDto} from './dto/update-leader-board.dto';
import {PageOptionsDto} from 'src/common/shared/pagination/dtos';
import {JwtAuthGuard} from 'src/authentications/guard/jwt.juard';

@Controller('leader-boards')
export class LeaderBoardsController {
	constructor(private readonly leaderBoardsService: LeaderBoardsService) {}

	@Post()
	create(@Body() createLeaderBoardDto: CreateLeaderBoardDto) {
		return this.leaderBoardsService.create(createLeaderBoardDto);
	}

	@Get(':contestId')
	findAll(
		@Param('contestId') contestId: number,
		@Query() pageOptionsDto: PageOptionsDto,
	) {
		return this.leaderBoardsService.getAll(pageOptionsDto, {
			where: {
				contest: {id: contestId}
			},
			order: {
				score: 'DESC',
			},
			relations: {user: true}
		});
	}

	@Get('user/table-ranks')
	@UseGuards(JwtAuthGuard)
	async findAllTableRanks(
		@Req() req: any,
	) {
		return {
			data: await this.leaderBoardsService.findAll({
				where: {
					user: {id: req.user.sub}
				},
				order: {
					updatedAt: 'DESC',
				},
				take: 10,
			})
		};
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.leaderBoardsService.findOne(+id);
	// }

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateLeaderBoardDto: UpdateLeaderBoardDto) {
		return this.leaderBoardsService.update(+id, updateLeaderBoardDto);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.leaderBoardsService.remove(+id);
	// }
}
