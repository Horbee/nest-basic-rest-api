import {
    Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, NotFoundException,
    Param, Post, Put, UseGuards, UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './interfaces/create-response.interface';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id): Promise<IUser> {
    const user = await this.usersService.findOne(id);
    if (user) return user;
    else throw new NotFoundException();
  }

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<CreateUserResponse> {
    const result = await this.usersService.create(userDto);
    if (!result.error) return result;
    throw new HttpException(result, 400);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  deleteOne(@Param('id') id): Promise<IUser> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  updateOne(
    @Param('id') id,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(id, updateUserDto);
  }
}
