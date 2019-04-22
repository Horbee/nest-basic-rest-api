import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './interfaces/create-response.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id): Promise<User> {
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
  deleteOne(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateOne(
    @Param('id') id,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
