import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import keys from './config/keys';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(keys.mongoURI)],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
