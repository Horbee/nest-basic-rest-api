import * as bcrypt from 'bcryptjs';

import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async login(@Body() userDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(userDto.username);
    if (!user) {
      throw new HttpException(
        { error: true, msg: 'Incorrect username or password' },
        404,
      );
    } else {
      const isMatch = await bcrypt.compare(userDto.password, user.password);
      if (isMatch) {
        const token = await this.authService.signIn(user.username);
        return { error: false, token: `Bearer ${token}` };
      } else {
        throw new HttpException(
          { error: true, msg: 'Incorrect username or password' },
          404,
        );
      }
    }
  }
}
