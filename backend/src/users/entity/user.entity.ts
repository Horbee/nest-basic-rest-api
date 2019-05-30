import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../interfaces/user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column('text')
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
