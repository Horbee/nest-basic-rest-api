import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import keys from "./config/keys";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // MongooseModule.forRoot(keys.mongoURI)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'horox',
      password: 'test',
      database: 'nesttest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
