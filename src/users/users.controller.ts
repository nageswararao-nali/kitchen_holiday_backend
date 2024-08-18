// src/users/users.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './models/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.usersService.findOneById(id);
  }

  @Post('addUser')
  async addUser(@Body() reqBody: any) {
    let response = {
      success: true,
      message: 'User Registered'
    }
    console.log("welocme")
    console.log(reqBody)
    const user: UserEntity = await this.usersService.findOneByUsername(reqBody.username)
    console.log("after")
    if (user) {
        response.success = false;
        response.message = "User with username "+reqBody.username+" already exists";
    } else {
        const userData = await this.usersService.create(reqBody)
        if (!userData) {
            response.success = false;
            response.message = "Problem in registering the user";
        }
    }
    return response
  }

  @Post('totalUsers')
  async totalUsers(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User list'
    }
    const count = await this.usersService.totalUsers(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting users list the user";
    } else {
      response.data = count
    }
    
    return response
  }

  @Post('getUsers')
  async getUsers(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User list'
    }
    const {items, count} = await this.usersService.getUsers(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting users";
    } else {
      response.data = {users: items, count}
    }
    
    return response
  }

  @Post('addUserAddress')
  async addUserAddress(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User Address added'
    }
    const userAddressData = await this.usersService.addUserAddress(reqBody)
    if (!userAddressData) {
        response.success = false;
        response.message = "Problem in adding user address";
    } else {
      response.data = userAddressData
    }
    
    return response
  }

  @Post('getUserAddresses')
  async getUserAddresses(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User list'
    }
    const {items, count} = await this.usersService.userAddressesByUserId(reqBody.userId)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting users";
    } else {
      response.data = {users: items, count}
    }
    
    return response
  }
  
}
