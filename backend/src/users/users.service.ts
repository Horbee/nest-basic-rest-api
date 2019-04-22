import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserResponse } from './interfaces/create-response.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ username: email });
  }

  async create(newUser: User): Promise<CreateUserResponse> {
    const user = await this.userModel.findOne({ username: newUser.username });
    if (user) {
      return { error: true, email: 'This email is already taken.' };
    } else {
      const createUser = new this.userModel(newUser);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(createUser.password, salt, async (hashErr, hash) => {
          createUser.password = hash;
          await createUser.save();
        });
      });
      return {
        error: false,
        user: { id: createUser._id, username: createUser.username },
      };
    }
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
