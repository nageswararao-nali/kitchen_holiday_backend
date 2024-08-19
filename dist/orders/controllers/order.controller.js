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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../services/order.service");
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrders(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Items list'
        };
        const { items, count } = await this.orderService.list(reqBody);
        if (!count) {
            response.success = false;
            response.message = "Problem in getting categories list the user";
        }
        else {
            response.data = { items, count };
        }
        return response;
    }
    async getOrder(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Items list'
        };
        const order = await this.orderService.getOrder(reqBody);
        if (!order) {
            response.success = false;
            response.message = "Problem in getting order";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async addOrder(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.orderService.addOrder(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding order";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async addUserOrder(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.orderService.addUserOrder(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in adding order";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async updateOrderStatus(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.orderService.updateOrderStatus(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in updating order";
        }
        else {
            response.data = order;
        }
        return response;
    }
    async updateOrder(reqBody) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const order = await this.orderService.updateOrder(reqBody);
        if (!order) {
            response.success = false;
            response.message = "problem in updating order";
        }
        else {
            response.data = order;
        }
        return response;
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('getOrders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('getOrder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)('addOrder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addOrder", null);
__decorate([
    (0, common_1.Post)('addUserOrder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addUserOrder", null);
__decorate([
    (0, common_1.Post)('updateOrderStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Post)('updateOrder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=order.controller.js.map