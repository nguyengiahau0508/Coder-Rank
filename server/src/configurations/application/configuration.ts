import {registerAs} from "@nestjs/config";
import {env} from "process";

export default registerAs('app', () => ({
	env: process.env.APP_ENV,
	name: process.env.APP_NAME,
	host: process.env.APP_HOST,
	port: process.env.APP_PORT,
	url: process.env.APP_URL,
	client_student_url: process.env.CLIENT_STUDENT_URL
}))


