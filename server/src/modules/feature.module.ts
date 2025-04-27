import { Module } from "@nestjs/common";
import { MariadbFeatureModule } from "./mariadb/mariadb.module";
import { RunnerModule } from "./coderunner/runner.module";

@Module({
  imports: [
    MariadbFeatureModule,
    RunnerModule
  ]
})
export class FeatureModule { }
