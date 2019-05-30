import { IsString } from 'class-validator';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelPropertyOptional()
  @IsString()
  readonly username: string;

  @ApiModelPropertyOptional()
  @IsString()
  readonly password: string;
}
