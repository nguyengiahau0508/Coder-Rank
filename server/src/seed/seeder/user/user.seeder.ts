import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/modules/mariadb/users/dto/create-user.dto";
import { sampleUsers } from "./user-sample";
import { UsersService } from "src/modules/mariadb/users/users.service";

@Injectable()
export class UserSeeder {
  private readonly users: CreateUserDto[] = sampleUsers

  constructor(
    private readonly usersService: UsersService
  ) { }

  public async seed() {
    const exists = await this.usersService.findAll()
    if (exists.length == 0)
      await this.usersService.saveMany(this.users);
    console.log('✅ User seeding done!');
  }
}
