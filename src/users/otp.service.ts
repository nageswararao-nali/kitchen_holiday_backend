// src/msg91/msg91.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class Msg91Service {
  private apiKey = 'YOUR_MSG91_API_KEY';
  private senderId = 'YOUR_SENDER_ID';
  private route = '4'; // Use the appropriate route as per your requirement

  constructor(private httpService: HttpService) {}

  async sendOtp(mobileNumber: string, otp: string): Promise<void> {
    const url = `https://api.msg91.com/api/v5/otp?authkey=${this.apiKey}&template_id=YOUR_TEMPLATE_ID&mobile=${mobileNumber}&otp=${otp}`;
    await this.httpService.post(url).toPromise();
  }
}