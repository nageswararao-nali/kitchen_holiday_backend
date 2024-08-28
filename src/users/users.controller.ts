// src/users/users.controller.ts
import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './models/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('deleteUser')
  async deleteUser(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User list'
    }
    const delUserResp = await this.usersService.deleteUser(reqBody.userId)
    if(!delUserResp) {
        response.success = false;
        response.message = "Problem in deleting user";
    } else {
      response.data = delUserResp
    }
    
    return response
  }

  @Post('getUserAddress')
  async getUserAddress(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User address'
    }
    const address = await this.usersService.findAddressById(reqBody.id)
    if(!address) {
        response.success = false;
        response.message = "Problem in getting users";
    } else {
      response.data = address
    }
    
    return response
  }

  @Post('updateUser')
  async updateUser(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'User list'
    }
    const delUserResp = await this.usersService.updateUser(reqBody)
    if(!delUserResp) {
        response.success = false;
        response.message = "Problem in updating user";
    } else {
      response.data = delUserResp
    }
    
    return response
  }

  @Post('updateUserImage')
  @UseInterceptors(FileInterceptor('userImage'))
  async addItem(@Body() reqBody: any, @UploadedFile() itemImage: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const odometerUpload = await this.usersService.updateUserImage(itemImage, reqBody)
      if (!odometerUpload) {
          response.success = false;
          response.message = "Problem in adding item";
      } else {
          response.data = odometerUpload
      }
      return response
  }
  
}
