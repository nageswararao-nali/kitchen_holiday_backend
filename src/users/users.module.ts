// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './models/user.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './models/address.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
  ],
  providers: [UsersService, UserEntity, AddressEntity],
  controllers: [UsersController],
  exports: [UserEntity, UsersService, AddressEntity],
})
export class UsersModule {}
