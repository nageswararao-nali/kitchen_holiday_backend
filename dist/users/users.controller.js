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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findOne(id) {
        return this.usersService.findOneById(id);
    }
    async addUser(reqBody) {
        let response = {
            success: true,
            message: 'User Registered'
        };
        console.log("welocme");
        console.log(reqBody);
        const user = await this.usersService.findOneByUsername(reqBody.username);
        console.log("after");
        if (user) {
            response.success = false;
            response.message = "User with username " + reqBody.username + " already exists";
        }
        else {
            const userData = await this.usersService.create(reqBody);
            if (!userData) {
                response.success = false;
                response.message = "Problem in registering the user";
            }
        }
        return response;
    }
    async totalUsers(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User list'
        };
        const count = await this.usersService.totalUsers(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting users list the user";
        }
        else {
            response.data = count;
        }
        return response;
    }
    async getUsers(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User list'
        };
        const { items, count } = await this.usersService.getUsers(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting users";
        }
        else {
            response.data = { users: items, count };
        }
        return response;
    }
    async addUserAddress(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User Address added'
        };
        const userAddressData = await this.usersService.addUserAddress(reqBody);
        if (!userAddressData) {
            response.success = false;
            response.message = "Problem in adding user address";
        }
        else {
            response.data = userAddressData;
        }
        return response;
    }
    async getUserAddresses(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User list'
        };
        const { items, count } = await this.usersService.userAddressesByUserId(reqBody.userId);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting users";
        }
        else {
            response.data = { users: items, count };
        }
        return response;
    }
    async deleteUser(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User list'
        };
        const delUserResp = await this.usersService.deleteUser(reqBody.userId);
        if (!delUserResp) {
            response.success = false;
            response.message = "Problem in deleting user";
        }
        else {
            response.data = delUserResp;
        }
        return response;
    }
    async getUserAddress(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User address'
        };
        const address = await this.usersService.findAddressById(reqBody.id);
        if (!address) {
            response.success = false;
            response.message = "Problem in getting users";
        }
        else {
            response.data = address;
        }
        return response;
    }
    async updateUser(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'User list'
        };
        const delUserResp = await this.usersService.updateUser(reqBody);
        if (!delUserResp) {
            response.success = false;
            response.message = "Problem in updating user";
        }
        else {
            response.data = delUserResp;
        }
        return response;
    }
    async addItem(reqBody, itemImage) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const odometerUpload = await this.usersService.updateUserImage(itemImage, reqBody);
        if (!odometerUpload) {
            response.success = false;
            response.message = "Problem in adding item";
        }
        else {
            response.data = odometerUpload;
        }
        return response;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('addUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('totalUsers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "totalUsers", null);
__decorate([
    (0, common_1.Post)('getUsers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('addUserAddress'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUserAddress", null);
__decorate([
    (0, common_1.Post)('getUserAddresses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserAddresses", null);
__decorate([
    (0, common_1.Post)('deleteUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('getUserAddress'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserAddress", null);
__decorate([
    (0, common_1.Post)('updateUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('updateUserImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('userImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addItem", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map