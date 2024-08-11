// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './models/address.entity';

@Injectable()
export class UsersService {
  constructor(
        @InjectRepository(UserEntity)
        private usersRepo: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private addressRepo: Repository<AddressEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<any> {
    console.log("username", username)
    const user = await this.usersRepo.findOne({where: {username}});
    return user
  }
  async findOneById(id: number): Promise<any> {
    const user = await this.usersRepo.findOneBy({id});
    return user
  }
  
  async create(reqBody: any): Promise<any> {

    let userInput = {
      username: reqBody.username,
      mobile: reqBody.mobile,
      email: reqBody.email,
      user_type: reqBody.user_type ? reqBody.user_type : 'customer',
      password: reqBody.password,
      isActive: true
    }
    console.log(userInput)
    let user = await this.usersRepo.save(userInput)
    return user
  }

  // async setOtp(mobileNumber: string, otp: string, otpExpiry: Date): Promise<User> {
  //   let user = await this.userModel.findOneAndUpdate({ mobileNumber }, { otp, otpExpiry }, { upsert: true, new: true }).exec();
  //   console.log(user)
  //   return user
  // }

  // async verifyOtp(mobileNumber: string, otp: string): Promise<boolean> {
  //   const user = await this.findOneByMobile(mobileNumber);
  //   if (user && user.otp === otp && user.otpExpiry > new Date()) {
  //     return true;
  //   }
  //   return false;
  // }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepo.findOneBy({username});
    console.log(user)
    console.log(user.password, password)
    if (user && user.password === password) {
      return true;
    }
    return false;
  }

  async totalUsers(reqBody: any): Promise<any> {
    console.log(reqBody.searchQuery)
    const [items, count] = await this.usersRepo.findAndCount({where:reqBody.searchQuery});
    return {count}
  }

  async getUsers(reqBody: any): Promise<any> {
    console.log(reqBody.searchQuery)
    const [items, count] = await this.usersRepo.findAndCount({where:reqBody.searchQuery});
    return {items, count}
  }

  async userAddressesByUserId(userId: number): Promise<any> {
    const [items, count] = await this.addressRepo.findAndCount({where:{userId}});
    return {items, count}
  }

  async userDefaultAddressesByUserId(userId: number): Promise<any> {
    let defaultAddress  = {}
    const {items, count} = await this.userAddressesByUserId(userId)
    let defaultAddresses = items.filter((address) => {
      return address.isDefault
    })
    defaultAddress = defaultAddresses[0]
    if(!defaultAddress) {
      defaultAddress = items[0]
    }
    return defaultAddress
  }

  async findAddressById(id: number): Promise<any> {
    const address = await this.addressRepo.findOneBy({id});
    return address
  }

  async addAddress(reqBody: any): Promise<any> {
    let userInput = {
      userId: reqBody.userId,
      fName: reqBody.fName,
      lName: reqBody.lName,
      address: reqBody.address,
      address1: reqBody.address1,
      city: reqBody.city,
      email: reqBody.email,
      mobile: reqBody.mobile,
      zipcode: reqBody.zipcode,
      isDefault: true
    }
    console.log(userInput)
    let address = await this.addressRepo.save(userInput)
    return address
  }

}
