import {Injectable} from '@nestjs/common';
import {spawn} from 'child_process';
import {writeFile, unlink} from 'fs/promises';
import {join} from 'path';
import {randomUUID} from 'crypto';
import * as fsExtra from 'fs-extra';
import pidusage from 'pidusage';
import {Status} from 'src/common/enums/database/mariadb/submission.enums';
import {Language} from 'src/common/enums/database/mariadb/db-tables';

export interface RunnerTestCase {
	order?: number;
	input: string;
	expected: string;
	timeLimit?: number; // ms
	memoryLimit?: number; // MB
	output?: string;
	status?: Status;
	executionTime?: number; // s
	memoryUsed?: number; // MB
	errorMessage?: string;
}

@Injectable()
export class RunnerService {
	private readonly tempDir = '/tmp/code-runner';
	private readonly DEFAULT_TIME_LIMIT = 1000; // 1s in ms
	private readonly DEFAULT_MEMORY_LIMIT = 256; // 256MB
	private readonly DECIMAL_PLACES = 3; // Làm tròn đến 3 chữ số thập phân

	constructor() {
		fsExtra.ensureDirSync(this.tempDir);
	}

	private async cleanupFiles(...files: string[]): Promise<void> {
		await Promise.all(files.map(file => unlink(file).catch(() => {})));
	}

	// private async runProcess(
	// 	command: string[],
	// 	input: string,
	// 	timeLimit: number,
	// 	memoryLimit: number,
	// ): Promise<{output: string; executionTime: number; memoryUsed: number; error?: string}> {
	// 	return new Promise((resolve, reject) => {
	// 		const process = spawn(command[0], command.slice(1), {stdio: ['pipe', 'pipe', 'pipe']});
	// 		let output = '';
	// 		let error = '';
	// 		let maxMemory = 0;
	// 		let startTime: number;
	//
	// 		const monitorResources = setInterval(async () => {
	// 			try {
	// 				const stats = await pidusage(process.pid);
	// 				const memoryMB = stats.memory / (1024 * 1024);
	// 				maxMemory = Math.max(maxMemory, memoryMB);
	// 				if (memoryMB > memoryLimit) {
	// 					process.kill('SIGKILL');
	// 					clearInterval(monitorResources);
	// 					reject({status: Status.MEMORY_LIMIT_EXCEEDED, error: `Memory limit exceeded: ${memoryMB}MB > ${memoryLimit}MB`});
	// 				}
	// 			} catch (err) {}
	// 		}, 20);
	//
	// 		const timeout = setTimeout(() => {
	// 			process.kill('SIGKILL');
	// 			clearInterval(monitorResources);
	// 			reject({status: Status.TIME_LIMIT_EXCEEDED, error: `Time limit exceeded: >${timeLimit}ms`});
	// 		}, timeLimit);
	//
	// 		process.stdin.write(input + '\n');
	// 		process.stdin.end(() => {
	// 			startTime = performance.now();
	// 		});
	//
	// 		process.stdout.on('data', (data) => (output += data.toString()));
	// 		process.stderr.on('data', (data) => (error += data.toString()));
	//
	// 		process.on('close', (code) => {
	// 			clearTimeout(timeout);
	// 			clearInterval(monitorResources);
	// 			const executionTime = startTime ? (performance.now() - startTime) / 1000 : 0;
	//
	// 			if (code === 0) {
	// 				resolve({
	// 					output: output.trim(),
	// 					executionTime: Number(executionTime.toFixed(this.DECIMAL_PLACES)), // Làm tròn đến 3 chữ số thập phân
	// 					memoryUsed: Number(maxMemory.toFixed(this.DECIMAL_PLACES)),       // Làm tròn đến 3 chữ số thập phân
	// 				});
	// 			} else {
	// 				reject({error: error || `Process exited with code ${code}`, status: Status.RUNTIME_ERROR});
	// 			}
	// 		});
	//
	// 		process.on('error', (err) => {
	// 			clearTimeout(timeout);
	// 			clearInterval(monitorResources);
	// 			reject({error: err.message, status: Status.RUNTIME_ERROR});
	// 		});
	// 	});
	// }

	private async runProcess(
		command: string[],
		input: string,
		timeLimit: number,
		memoryLimit: number,
	): Promise<{output: string; executionTime: number; memoryUsed: number; error?: string}> {
		return new Promise((resolve, reject) => {
			const firejailCommand = [
				'firejail',
				'--quiet',
				'--private',
				`--whitelist=${this.tempDir}`, // Thêm để ánh xạ /tmp/code-runner
				'--net=none',
				`--rlimit-as=${memoryLimit * 1024 * 1024}`,
				`--rlimit-cpu=${Math.ceil(timeLimit / 1000)}`,
				'--nosound',
				'--caps.drop=all',
				'--seccomp',
				'--',
				...command,
			];

			const process = spawn(firejailCommand[0], firejailCommand.slice(1), {
				stdio: ['pipe', 'pipe', 'pipe'],
			});

			let output = '';
			let error = '';
			let maxMemory = 0;
			let startTime: number;

			const monitorResources = setInterval(async () => {
				try {
					const stats = await pidusage(process.pid);
					const memoryMB = stats.memory / (1024 * 1024);
					maxMemory = Math.max(maxMemory, memoryMB);
					if (memoryMB > memoryLimit) {
						process.kill('SIGKILL');
						clearInterval(monitorResources);
						reject({
							status: Status.MEMORY_LIMIT_EXCEEDED,
							error: `Memory limit exceeded: ${memoryMB}MB > ${memoryLimit}MB`,
						});
					}
				} catch (_) {}
			}, 20);

			const timeout = setTimeout(() => {
				process.kill('SIGKILL');
				clearInterval(monitorResources);
				reject({
					status: Status.TIME_LIMIT_EXCEEDED,
					error: `Time limit exceeded: >${timeLimit}ms`,
				});
			}, timeLimit);

			process.stdin.write(input + '\n');
			process.stdin.end(() => {
				startTime = performance.now();
			});

			process.stdout.on('data', (data) => (output += data.toString()));
			process.stderr.on('data', (data) => (error += data.toString()));

			process.on('close', (code) => {
				clearTimeout(timeout);
				clearInterval(monitorResources);
				const executionTime = startTime ? (performance.now() - startTime) / 1000 : 0;

				if (code === 0) {
					resolve({
						output: output.trim(),
						executionTime: Number(executionTime.toFixed(this.DECIMAL_PLACES)),
						memoryUsed: Number(maxMemory.toFixed(this.DECIMAL_PLACES)),
					});
				} else {
					reject({
						error: error || `Process exited with code ${code}`,
						status: Status.RUNTIME_ERROR,
					});
				}
			});

			process.on('error', (err) => {
				clearTimeout(timeout);
				clearInterval(monitorResources);
				reject({error: err.message, status: Status.RUNTIME_ERROR});
			});
		});
	}

	async run(language: Language, code: string, testCases: RunnerTestCase[]): Promise<RunnerTestCase[]> {
		if (language === Language.CPP) return this.runCpp(code, testCases);
		if (language === Language.PYTHON) return this.runPython(code, testCases);
		throw new Error(`Unsupported language: ${language}`);
	}

	async runPython(code: string, testCases: RunnerTestCase[]): Promise<RunnerTestCase[]> {
		const filename = join(this.tempDir, `${randomUUID()}.py`);
		await writeFile(filename, code);

		try {
			const results = await Promise.all(
				testCases.map(async (testCase) => {
					const result: RunnerTestCase = {...testCase, status: Status.PENDING};
					const timeLimit = testCase.timeLimit ?? this.DEFAULT_TIME_LIMIT;
					const memoryLimit = testCase.memoryLimit ?? this.DEFAULT_MEMORY_LIMIT;

					try {
						const {output, executionTime, memoryUsed} = await this.runProcess(
							['python3', filename],
							testCase.input,
							timeLimit,
							memoryLimit,
						);
						result.output = output;
						result.executionTime = executionTime;
						result.memoryUsed = memoryUsed;
						result.status = output === testCase.expected ? Status.ACCEPTED : Status.WRONG_ANSWER;
					} catch (error: any) {
						result.status = error.status || Status.RUNTIME_ERROR;
						result.errorMessage = error.error || 'Unknown error';
						result.executionTime = 0;
						result.memoryUsed = 0;
					}
					return result;
				}),
			);
			return results;
		} finally {
			await this.cleanupFiles(filename);
		}
	}

	async runCpp(code: string, testCases: RunnerTestCase[]): Promise<RunnerTestCase[]> {
		const cppFile = join(this.tempDir, `${randomUUID()}.cpp`);
		const exeFile = cppFile.replace('.cpp', '');
		await writeFile(cppFile, code);

		try {
			await new Promise((resolve, reject) => {
				const compile = spawn('g++', [cppFile, '-o', exeFile]);
				let error = '';
				compile.stderr.on('data', (data) => (error += data.toString()));
				compile.on('close', (code) => {
					if (code === 0) resolve(null);
					else reject({status: Status.COMPILATION_ERROR, error});
				});
			});

			const results = await Promise.all(
				testCases.map(async (testCase) => {
					const result: RunnerTestCase = {...testCase, status: Status.PENDING};
					const timeLimit = testCase.timeLimit ?? this.DEFAULT_TIME_LIMIT;
					const memoryLimit = testCase.memoryLimit ?? this.DEFAULT_MEMORY_LIMIT;

					try {
						const {output, executionTime, memoryUsed} = await this.runProcess(
							[exeFile],
							testCase.input,
							timeLimit,
							memoryLimit,
						);
						result.output = output;
						result.executionTime = executionTime;
						result.memoryUsed = memoryUsed;
						result.status = output === testCase.expected ? Status.ACCEPTED : Status.WRONG_ANSWER;
					} catch (error: any) {
						result.status = error.status || Status.RUNTIME_ERROR;
						result.errorMessage = error.error || 'Unknown error';
						result.executionTime = 0;
						result.memoryUsed = 0;
					}
					return result;
				}),
			);
			return results;
		} catch (error: any) {
			return testCases.map(testCase => ({
				...testCase,
				status: error.status || Status.COMPILATION_ERROR,
				errorMessage: error.error || 'Compilation failed',
				executionTime: 0,
				memoryUsed: 0,
			}));
		} finally {
			await this.cleanupFiles(cppFile, exeFile);
		}
	}
}
