import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: number): Promise<any>;
    addUser(reqBody: any): Promise<{
        success: boolean;
        message: string;
    }>;
    totalUsers(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getUsers(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addUserAddress(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getUserAddresses(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    deleteUser(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getUserAddress(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    updateUser(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addItem(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
}
