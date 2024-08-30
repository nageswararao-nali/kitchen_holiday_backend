// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './models/address.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
        @InjectRepository(UserEntity)
        private usersRepo: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private addressRepo: Repository<AddressEntity>,
        private configService: ConfigService
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
      fName: reqBody.fName,
      lName: reqBody.lName,
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

  async login(username: string, password: string, userType: string): Promise<boolean> {
    const user = await this.usersRepo.findOneBy({username});
    console.log(user)
    // console.log(user.password, password)
    if (user && user.password === password && user.user_type == userType) {
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

  async addUserAddress(reqBody: any): Promise<any> {
    let userInput = {
      userId: reqBody.userId,
      fName: reqBody.fName,
      lName: reqBody.lName,
      address: reqBody.address,
      address1: reqBody.address1,
      country: reqBody.country,
      state: reqBody.state,
      email: reqBody.email,
      mobile: reqBody.mobile,
      zipcode: reqBody.zipcode,
      latitude: reqBody.latitude,
      longitude: reqBody.longitude,
      isDefault: true
    }
    console.log(userInput)
    let address = await this.addressRepo.save(userInput)
    return address
  }

  async deleteUser(userId: number): Promise<any> {
    let delResp = await this.usersRepo.delete({id: userId})
    return delResp;
  }

  async updateUser(reqBody: any): Promise<any> {
    let user = await this.usersRepo.update({id: reqBody.userId}, reqBody.updateData)
    return user
  }
  
  async updateUserImage(file, reqBody: any): Promise<any> {
    let imagePath = "";
    if(file) {
      console.log("uploading file")
      const { originalname } = file;
      const bucketS3 = 'kitchen-holiday-images';
      const uploadedData: any = await this.uploadS3(file.buffer, bucketS3, originalname);
      imagePath = uploadedData.Location
    }
    
    
    // return uploadedData.Location
    const createdItem = await this.usersRepo.update({id: reqBody.userId}, {image: imagePath});
    return createdItem;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
        Bucket: bucket,
        Key: String(name),
        Body: file,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
        if (err) {
            reject(err.message);
        }
        resolve(data);
        });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    });
  }
}
