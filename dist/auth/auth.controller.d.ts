import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
        userType: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
