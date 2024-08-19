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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../models/order.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const users_service_1 = require("../../users/users.service");
const items_service_1 = require("../../items/services/items.service");
let OrdersService = class OrdersService {
    constructor(orderModel, userService, itemSerivce) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.itemSerivce = itemSerivce;
    }
    findOne(id) {
        return this.orderModel.findOneBy({ id });
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
        if (reqBody.orderDate) {
            whereCon['orderDate'] = reqBody.orderDate;
        }
        if (reqBody.userId) {
            whereCon['userId'] = reqBody.userId;
        }
        const [items, count] = await this.orderModel.findAndCount({ where: whereCon, order: { created_at: 'DESC' } });
        return { items, count };
    }
    async getOrder(reqBody) {
        const item = await this.orderModel.findOneBy({ id: reqBody.id });
        return item;
    }
    async addOrder(reqBody) {
        console.log("add order");
        let addressData = {};
        let price = 0;
        if (!reqBody.addressId) {
            console.log("add order1");
            addressData = await this.userService.userDefaultAddressesByUserId(reqBody.userId);
            console.log("add order2");
        }
        else {
            addressData = await this.userService.findAddressById(reqBody.userId);
        }
        console.log("add order3");
        let date = moment().format('YYYY-MM-DD');
        console.log(date);
        let order = {
            userId: reqBody.userId,
            itemId: reqBody.itemId,
            itemName: reqBody.itemName,
            subItems: reqBody.subItems,
            quantity: reqBody.quantity,
            addressId: addressData.id,
            totalAmount: price,
            customerName: addressData.fName + " " + addressData.lName,
            customerMobile: addressData.mobile,
            address: addressData.address + " " + addressData.address1 + " " + addressData.city + " " + addressData.zipcode,
            orderDate: moment().format('YYYY-MM-DD'),
            orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            status: 'new',
            orderType: 'normal'
        };
        const createdItem = await this.orderModel.save(order);
        return createdItem;
    }
    async getOrderDates(startDate, noOrders, planDays) {
        const orders = [];
        let currentDate = new Date(startDate);
        while (orders.length < noOrders) {
            const dayOfWeek = currentDate.getDay();
            if (planDays.indexOf(dayOfWeek) > -1) {
                console.log(currentDate);
                orders.push(moment(currentDate).format('YYYY-MM-DD'));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return orders;
    }
    async addUserOrder(reqBody) {
        console.log("add order");
        let createdItem = {};
        let subItems = {};
        for (let subItemId of reqBody.subItems) {
            if (!subItems[subItemId]) {
                subItems[subItemId] = 0;
            }
            subItems[subItemId] = subItems[subItemId] + 1;
        }
        if (reqBody.extraSubItems && reqBody.extraSubItems.length) {
            for (let subItemId of reqBody.extraSubItems) {
                if (!subItems[subItemId]) {
                    subItems[subItemId] = 0;
                }
                subItems[subItemId] = subItems[subItemId] + 1;
            }
        }
        let orderDates = await this.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan);
        console.log(orderDates);
        for (let orderDate of orderDates) {
            let order = {
                userId: reqBody.userId,
                itemId: reqBody.itemId,
                itemName: reqBody.itemName,
                subItems: JSON.stringify(subItems),
                quantity: reqBody.quantity,
                addressId: reqBody.addressId,
                totalAmount: reqBody.totalAmount,
                customerName: reqBody.customerName,
                customerMobile: reqBody.mobile,
                address: reqBody.address,
                orderDate: orderDate,
                orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: reqBody.status,
                orderType: reqBody.orderType,
                subscriptionId: reqBody.subscriptionId
            };
            console.log(order);
            createdItem = await this.orderModel.save(order);
        }
        return createdItem;
    }
    async updateOrderStatus(reqBody) {
        let order = await this.orderModel.update({ id: reqBody.orderId }, { status: reqBody.status });
        return order;
    }
    async remove(id) {
        return;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrdersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        items_service_1.ItemsService])
], OrdersService);
//# sourceMappingURL=order.service.js.map