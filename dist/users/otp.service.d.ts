import { HttpService } from '@nestjs/axios';
export declare class Msg91Service {
    private httpService;
    private apiKey;
    private senderId;
    private route;
    constructor(httpService: HttpService);
    sendOtp(mobileNumber: string, otp: string): Promise<void>;
}
