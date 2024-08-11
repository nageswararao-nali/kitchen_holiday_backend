// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Msg91Service } from '../users/otp.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private msg91Service: Msg91Service,
  ) {}

  /*async sendOtp(mobileNumber: string): Promise<any> {
    // const otp = crypto.randomInt(100000, 999999).toString();
    const otp = (123456).toString();
    const otpExpiry = new Date(Date.now() + 300000); // 5 minutes expiry

    return await this.usersService.setOtp(mobileNumber, otp, otpExpiry);
    // await this.msg91Service.sendOtp(mobileNumber, otp);
  }

  async validateOtp(mobileNumber: string, otp: string): Promise<any> {
    const isValid = await this.usersService.verifyOtp(mobileNumber, otp);
    if (isValid) {
      const user = await this.usersService.findOneByMobile(mobileNumber);
      const payload = { mobileNumber: user.mobileNumber, sub: user._id.toString() };
      return {
        access_token: this.jwtService.sign(payload),
        user
      };
    } 
    return null;
  }*/

  async login(username: string, password: string): Promise<any> {
    const isValid = await this.usersService.login(username, password);
    if (isValid) {
      const user = await this.usersService.findOneByUsername(username);
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        user
      };
    }  else {
      console.log(" in else ")
    }
    return null;
  }
}
