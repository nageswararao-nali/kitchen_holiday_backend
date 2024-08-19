import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Msg91Service } from '../users/otp.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private msg91Service;
    constructor(usersService: UsersService, jwtService: JwtService, msg91Service: Msg91Service);
    login(username: string, password: string, userType: string): Promise<any>;
}
