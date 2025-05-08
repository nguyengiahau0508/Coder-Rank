import {Module} from '@nestjs/common';
import {ProblemsService} from './problems.service';
import {ProblemsController} from './problems.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Problem} from './entities/problem.entity';
import {ProblemRepository} from './problem.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Problem])
	],
	controllers: [ProblemsController],
	providers: [ProblemsService, ProblemRepository,],
	exports: [ProblemsService],
})
export class ProblemsModule {}
