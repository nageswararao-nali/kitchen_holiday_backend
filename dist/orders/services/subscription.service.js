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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../../users/users.service");
const subscription_entity_1 = require("../models/subscription.entity");
const mysubscriptions_entity_1 = require("../models/mysubscriptions.entity");
let SubscriptionsService = class SubscriptionsService {
    constructor(subRepo, mySubRepo, userService) {
        this.subRepo = subRepo;
        this.mySubRepo = mySubRepo;
        this.userService = userService;
    }
    findOne(id) {
        return this.subRepo.findOneBy({ id });
    }
    async list(reqBody) {
        let whereCon = {};
        if (reqBody.mobile) {
            whereCon['customerMobile'] = reqBody.mobile;
        }
        if (reqBody.name) {
            whereCon['customerMobile'] = (0, typeorm_2.Like)(`%${reqBody.name}%`);
        }
        if (reqBody.orderType) {
            whereCon['orderType'] = reqBody.orderType;
        }
        if (reqBody.status) {
            whereCon['status'] = reqBody.status;
        }
        if (reqBody.city) {
            whereCon['city'] = reqBody.city;
        }
        if (reqBody.zipcode) {
            whereCon['zipcode'] = reqBody.zipcode;
        }
        const [items, count] = await this.subRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async getSubscription(reqBody) {
        const item = await this.subRepo.findOneBy({ id: reqBody.id });
        return item;
    }
    async getMySubscriptions(reqBody) {
        let whereCon = {};
        if (reqBody.userId) {
            whereCon['userId'] = reqBody.userId;
        }
        if (reqBody.searchValue) {
            let { items } = await this.userService.getUsersSearch({ search: reqBody.searchValue, user_type: 'customer' });
            console.log(items);
            let userIds = [];
            for (let item of items) {
                userIds.push(item.id);
            }
            whereCon['userId'] = (0, typeorm_2.In)(userIds);
        }
        whereCon['isActive'] = true;
        const [items, count] = await this.mySubRepo.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async addSubscription(reqBody) {
        let createdItem = null;
        let subscription = {
            name: reqBody.name,
            shortName: reqBody.shortName,
            description: reqBody.description,
            price: reqBody.price,
            days: reqBody.days,
            isVeg: reqBody.isVeg
        };
        console.log(subscription);
        if (reqBody.id) {
            createdItem = await this.subRepo.update({ id: reqBody.id }, subscription);
        }
        else {
            createdItem = await this.subRepo.save(subscription);
        }
        return createdItem;
    }
    async deleteSubscription(reqBody) {
        const createdItem = await this.subRepo.delete({ id: reqBody.id });
        return createdItem;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.SubscriptionsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(mysubscriptions_entity_1.MySubscriptionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], SubscriptionsService);
//# sourceMappingURL=subscription.service.js.map