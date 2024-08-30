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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("../services/subscription.service");
let SubscriptionsController = class SubscriptionsController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async getSubscriptions(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const { items, count } = await this.subscriptionService.list(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting categories list the user";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async addSubscription(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.subscriptionService.addSubscription(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding order";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async getMySubscriptions(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const { items, count } = await this.subscriptionService.getMySubscriptions(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting subscriptions list the user";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async deleteSubscription(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.subscriptionService.deleteSubscription(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding order";
        }
        else {
            response.data = order;
        }
        return response;
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Post)('getSubscriptions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getSubscriptions", null);
__decorate([
    (0, common_1.Post)('addSubscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "addSubscription", null);
__decorate([
    (0, common_1.Post)('getMySubscriptions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getMySubscriptions", null);
__decorate([
    (0, common_1.Post)('deleteSubscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "deleteSubscription", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionsService])
], SubscriptionsController);
//# sourceMappingURL=subscription.controller.js.map