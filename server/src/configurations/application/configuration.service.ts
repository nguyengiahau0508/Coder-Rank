import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApplicaitionConfigurationService {
	constructor(private configurationService: ConfigService) {}

	get name(): string {
		return this.configurationService.get<string>('app.name');
	}

	get env(): string {
		return this.configurationService.get<string>('app.env');
	}

	get port(): number {
		return Number(this.configurationService.get<number>('app.port'));
	}

	get host(): string {
		return this.configurationService.get<string>('app.host')
	}

	get url(): string {
		return this.configurationService.get<string>('app.url')
	}

	get student_url(): string {
		return this.configurationService.get<string>('app.client_student_url')
	}
}
