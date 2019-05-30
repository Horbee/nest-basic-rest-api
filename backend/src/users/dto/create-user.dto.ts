import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
