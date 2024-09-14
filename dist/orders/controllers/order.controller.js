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
const platform_express_1 = require("@nestjs/platform-express");
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
    async deliveryOrders(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'orders list'
        };
        const { items, count } = await this.orderService.deliveryOrders(reqBody);
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
    async updateMySubscription(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const sub = await this.orderService.updateMySubscription(reqBody);
        if (!sub) {
            response.success = false;
            response.message = "Problem in getting subscriptions list the user";
        }
        else {
            response.data = sub;
        }
        return response;
    }
    async deleteMySubscription(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const sub = await this.orderService.deleteMySubscription(reqBody);
        if (!sub) {
            response.success = false;
            response.message = "Problem in getting subscriptions list the user";
        }
        else {
            response.data = sub;
        }
        return response;
    }
    async getOrderDates(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const sub = await this.orderService.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan);
        if (!sub) {
            response.success = false;
            response.message = "Problem in getting subscriptions list the user";
        }
        else {
            response.data = sub;
        }
        return response;
    }
    async getTodayOrdersReport(reqBody) {
        let response = {
            data: {},
            success: true,
            message: 'Subscriptions list'
        };
        const sub = await this.orderService.getTodayOrdersReport(reqBody);
        if (!sub) {
            response.success = false;
            response.message = "Problem in getting today order details";
        }
        else {
            response.data = sub;
        }
        return response;
    }
    async uploadDeliveryImage(reqBody, itemImage) {
        let response = {
            success: true,
            data: {},
            message: ''
        };
        const odometerUpload = await this.orderService.uploadDeliveryImage(itemImage, reqBody);
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
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('getOrders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('deliveryOrders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deliveryOrders", null);
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
__decorate([
    (0, common_1.Post)('updateMySubscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateMySubscription", null);
__decorate([
    (0, common_1.Post)('deleteMySubscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteMySubscription", null);
__decorate([
    (0, common_1.Post)('getOrderDates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderDates", null);
__decorate([
    (0, common_1.Post)('getTodayOrdersReport'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getTodayOrdersReport", null);
__decorate([
    (0, common_1.Post)('uploadDeliveryImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('deliveryImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "uploadDeliveryImage", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=order.controller.js.map