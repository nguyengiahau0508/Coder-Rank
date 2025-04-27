import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAuthProviderDto } from "../../auth_providers/dto/create-auth-provider.dto";
import { Gender } from "src/common/enums/authentication/gender.enum";
import { Role } from "src/common/enums/authentication/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  avatar: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthProviderDto)
  authProvider?: CreateAuthProviderDto;

  @IsString()
  username?: string

  @IsEnum(Gender)
  gender?: Gender

  @IsString()
  address?: string

  @IsString()
  phoneNumber?: string

  @IsDate()
  birthday?: Date

  @IsNumber()
  rating?: number

  @IsEnum(Role)
  role?: Role
}
