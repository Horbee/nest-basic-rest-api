import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { CreateUserResponse } from './interfaces/create-response.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  // constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    // return await this.userModel.find();
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<IUser> {
    // return await this.userModel.findById(id);
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<IUser> {
    // return await this.userModel.findOne({ username: email });
    return await this.userRepository.findOne({ where: { username: email } });
  }

  async create(newUser: IUser): Promise<CreateUserResponse> {
    // const user = await this.userModel.findOne({ username: newUser.username });
    const user = await this.userRepository.findOne({
      where: { username: newUser.username },
    });
    if (user) {
      return { error: true, email: 'This email is already taken.' };
    } else {
      // const createUser = new this.userModel(newUser);
      const createUser = new User({
        username: newUser.username,
        password: newUser.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(createUser.password, salt, async (hashErr, hash) => {
          createUser.password = hash;
          // await createUser.save();
          await this.userRepository.save(createUser);
        });
      });
      return {
        error: false,
        user: { id: createUser.id /*_id */, username: createUser.username },
      };
    }
  }

  async delete(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.delete(id);
    return user;
    // return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: IUser): Promise<IUser> {
    // return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne(id);
  }
}
