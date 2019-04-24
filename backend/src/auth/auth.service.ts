import { IUser } from "src/users/interfaces/user.interface";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { JWTPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const payload: JWTPayload = { username };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JWTPayload): Promise<IUser> {
    return await this.usersService.findOneByEmail(payload.username);
  }
}
