import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { AddressEntity } from './models/address.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private usersRepo;
    private addressRepo;
    private configService;
    constructor(usersRepo: Repository<UserEntity>, addressRepo: Repository<AddressEntity>, configService: ConfigService);
    findOneByUsername(username: string): Promise<any>;
    findOneById(id: number): Promise<any>;
    create(reqBody: any): Promise<any>;
    login(username: string, password: string, userType: string): Promise<boolean>;
    totalUsers(reqBody: any): Promise<any>;
    getUsers(reqBody: any): Promise<any>;
    userAddressesByUserId(userId: number): Promise<any>;
    userDefaultAddressesByUserId(userId: number): Promise<any>;
    findAddressById(id: number): Promise<any>;
    addUserAddress(reqBody: any): Promise<any>;
    deleteUser(userId: number): Promise<any>;
    updateUser(reqBody: any): Promise<any>;
    updateUserImage(file: any, reqBody: any): Promise<any>;
    uploadS3(file: any, bucket: any, name: any): Promise<unknown>;
    getS3(): S3;
}
