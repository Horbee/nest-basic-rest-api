import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
