import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { AddressEntity } from './models/address.entity';
export declare class UsersService {
    private usersRepo;
    private addressRepo;
    constructor(usersRepo: Repository<UserEntity>, addressRepo: Repository<AddressEntity>);
    findOneByUsername(username: string): Promise<any>;
    findOneById(id: number): Promise<any>;
    create(reqBody: any): Promise<any>;
    login(username: string, password: string): Promise<boolean>;
    totalUsers(reqBody: any): Promise<any>;
    getUsers(reqBody: any): Promise<any>;
    userAddressesByUserId(userId: number): Promise<any>;
    userDefaultAddressesByUserId(userId: number): Promise<any>;
    findAddressById(id: number): Promise<any>;
    addUserAddress(reqBody: any): Promise<any>;
}
