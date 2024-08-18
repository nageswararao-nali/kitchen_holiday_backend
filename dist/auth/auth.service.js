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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const otp_service_1 = require("../users/otp.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, msg91Service) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.msg91Service = msg91Service;
    }
    async login(username, password) {
        const isValid = await this.usersService.login(username, password);
        if (isValid) {
            const user = await this.usersService.findOneByUsername(username);
            const payload = { username: user.username, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
                user
            };
        }
        else {
            console.log(" in else ");
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        otp_service_1.Msg91Service])
], AuthService);
//# sourceMappingURL=auth.service.js.map