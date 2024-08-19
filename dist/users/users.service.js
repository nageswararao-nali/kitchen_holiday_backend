"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./models/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./models/address.entity");
let UsersService = class UsersService {
    constructor(usersRepo, addressRepo) {
        this.usersRepo = usersRepo;
        this.addressRepo = addressRepo;
    }
    async findOneByUsername(username) {
        console.log("username", username);
        const user = await this.usersRepo.findOne({ where: { username } });
        return user;
    }
    async findOneById(id) {
        const user = await this.usersRepo.findOneBy({ id });
        return user;
    }
    async create(reqBody) {
        let userInput = {
            fName: reqBody.fName,
            lName: reqBody.lName,
            username: reqBody.username,
            mobile: reqBody.mobile,
            email: reqBody.email,
            user_type: reqBody.user_type ? reqBody.user_type : 'customer',
            password: reqBody.password,
            isActive: true
        };
        console.log(userInput);
        let user = await this.usersRepo.save(userInput);
        return user;
    }
    async login(username, password, userType) {
        const user = await this.usersRepo.findOneBy({ username });
        console.log(user);
        console.log(user.password, password);
        if (user && user.password === password && user.user_type == userType) {
            return true;
        }
        return false;
    }
    async totalUsers(reqBody) {
        console.log(reqBody.searchQuery);
        const [items, count] = await this.usersRepo.findAndCount({ where: reqBody.searchQuery });
        return { count };
    }
    async getUsers(reqBody) {
        console.log(reqBody.searchQuery);
        const [items, count] = await this.usersRepo.findAndCount({ where: reqBody.searchQuery });
        return { items, count };
    }
    async userAddressesByUserId(userId) {
        const [items, count] = await this.addressRepo.findAndCount({ where: { userId } });
        return { items, count };
    }
    async userDefaultAddressesByUserId(userId) {
        let defaultAddress = {};
        const { items, count } = await this.userAddressesByUserId(userId);
        let defaultAddresses = items.filter((address) => {
            return address.isDefault;
        });
        defaultAddress = defaultAddresses[0];
        if (!defaultAddress) {
            defaultAddress = items[0];
        }
        return defaultAddress;
    }
    async findAddressById(id) {
        const address = await this.addressRepo.findOneBy({ id });
        return address;
    }
    async addUserAddress(reqBody) {
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
        };
        console.log(userInput);
        let address = await this.addressRepo.save(userInput);
        return address;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map