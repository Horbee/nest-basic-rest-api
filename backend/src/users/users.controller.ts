import { Request } from 'express';
import { Usr } from 'src/auth/decorators/user.decorator';

import {
    Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, HttpException,
    HttpStatus, NotFoundException, Param, Post, Put, Req, UseGuards, UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './interfaces/create-response.interface';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET all users
  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  // GET one user by id
  @Get(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id): Promise<IUser> {
    const user = await this.usersService.findOne(id);
    if (user) return user;
    else throw new NotFoundException();
  }

  // CREATE user
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<CreateUserResponse> {
    const result = await this.usersService.create(userDto);
    if (!result.error) return result;
    throw new HttpException(result, 400);
  }

  // DELETE user by id
  @Delete(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  deleteOne(@Param('id') id, @Usr() user: IUser) {
    if (user.id === Number(id)) return this.usersService.delete(id);
    throw new ForbiddenException();
  }

  // UPDATE user by id
  @Put(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  updateOne(
    @Param('id') id,
    @Body() updateUserDto: CreateUserDto,
    @Usr() user: IUser,
  ) {
    if (user.id === Number(id)) {
      return this.usersService.update(id, updateUserDto);
    }
    throw new ForbiddenException();
  }
}
