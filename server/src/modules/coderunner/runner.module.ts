import { RunnerController } from "./runner.controller";
import { RunnerService } from "./runner.service";
import { Module } from "@nestjs/common";

@Module({
  exports: [RunnerService],
  controllers: [RunnerController],
  providers: [RunnerService]
})
export class RunnerModule { }
