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
const mysubscriptions_entity_1 = require("../models/mysubscriptions.entity");
const subscription_service_1 = require("./subscription.service");
const zoneMapping_entity_1 = require("../models/zoneMapping.entity");
const notifications_entity_1 = require("../models/notifications.entity");
const pdf = require("html-pdf");
const fs = require("fs");
let OrdersService = class OrdersService {
    constructor(orderModel, mySubModel, zoneMapRepo, notiRepo, userService, itemSerivce, subSerivce) {
        this.orderModel = orderModel;
        this.mySubModel = mySubModel;
        this.zoneMapRepo = zoneMapRepo;
        this.notiRepo = notiRepo;
        this.userService = userService;
        this.itemSerivce = itemSerivce;
        this.subSerivce = subSerivce;
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
        else {
            whereCon['status'] = (0, typeorm_2.Not)('cancelled');
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
        let orderData = {};
        const item = await this.orderModel.findOneBy({ id: reqBody.id });
        if (item.deliveryParterId) {
            let deliveryBoy = await this.userService.findOneById(item.deliveryParterId);
            orderData = { ...item, deliveryBoy: deliveryBoy };
        }
        else {
            orderData = item;
        }
        return orderData;
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
    async sendBulkInvoice(invoiceData) {
        const pdfOptions = {
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            }
        };
        let data = [];
        var template = './public/invoice.html';
        var pdf_path = './public/invoice.pdf';
        var html = fs.readFileSync(template, 'utf8');
        let pdfCreate = (html, pdfOptions, pdf_path) => new Promise((resolve, reject) => {
            pdf.create(html, pdfOptions).toFile(pdf_path, function (err, res1) {
                if (err)
                    return;
                resolve(pdf_path);
            });
        });
        await pdfCreate(html, pdfOptions, pdf_path);
        return pdf_path;
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
            for (let subItemIdData of reqBody.extraSubItems) {
                if (!subItems[subItemIdData.itemId]) {
                    subItems[subItemIdData.itemId] = 0;
                }
                subItems[subItemIdData.itemId] = subItems[subItemIdData.itemId] + subItemIdData.quantity;
            }
        }
        let zoneMapping = await this.zoneMapRepo.find({ where: { zipcodes: (0, typeorm_2.Like)(`%${reqBody.zipcode}%`) } });
        if (reqBody.startDate) {
            let orderDates = await this.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan);
            console.log(orderDates);
            let subscription = await this.subSerivce.getSubscription({ id: reqBody.subscriptionId });
            let mySubObj = {
                itemId: reqBody.itemId,
                itemName: reqBody.itemName,
                subItems: JSON.stringify(subItems),
                quantity: reqBody.quantity,
                startDate: reqBody.startDate,
                endDate: orderDates[orderDates.length - 1],
                userId: reqBody.userId,
                subId: reqBody.subscriptionId,
                subName: subscription.name,
                price: reqBody.totalAmount,
                orderDates: JSON.stringify(orderDates),
                selectedPlan: JSON.stringify(reqBody.selectedPlan)
            };
            let muSub = await this.mySubModel.save(mySubObj);
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
                    subscriptionId: reqBody.subscriptionId,
                    latitude: reqBody.latitude,
                    longitude: reqBody.longitude,
                    deliverySlot: reqBody.deliverySlot,
                    mySubId: muSub.id,
                    deliveryParterId: (zoneMapping && zoneMapping.length) ? parseInt(zoneMapping[0].userId) : 0
                };
                console.log(order);
                createdItem = await this.orderModel.save(order);
                if (zoneMapping && zoneMapping.length) {
                    let noti = {
                        userId: zoneMapping[0].userId,
                        content: 'Order Assigned #' + createdItem.id,
                        created_at: new Date()
                    };
                    await this.notiRepo.save(noti);
                }
                let invoicePath = await this.sendBulkInvoice({});
                console.log("invoicePath");
                console.log(invoicePath);
            }
        }
        else {
            console.log("-----");
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
                orderDate: moment().format('YYYY-MM-DD'),
                orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: reqBody.status,
                orderType: reqBody.orderType,
                subscriptionId: 0,
                latitude: reqBody.latitude,
                longitude: reqBody.longitude,
                deliverySlot: reqBody.deliverySlot
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
    async updateOrder(reqBody) {
        let order = await this.orderModel.update({ id: reqBody.orderId }, reqBody.updateData);
        return order;
    }
    async updateMySubscription(reqBody) {
        console.log("add order");
        let mySub = await this.mySubModel.findOneBy({ id: reqBody.subId });
        let createdItem = {};
        if (reqBody.mySubLastDate) {
            let mySubOrder = await this.orderModel.findOneBy({ mySubId: reqBody.subId });
            let currentDate = new Date(reqBody.mySubLastDate);
            let startDate = currentDate.setDate(currentDate.getDate() + 1);
            let orderDates = await this.getOrderDates(startDate, reqBody.dates.length, JSON.parse(mySub.selectedPlan));
            console.log(orderDates);
            let oldOrderDates = JSON.parse(mySub.orderDates);
            for (let d of reqBody.dates) {
                let index = oldOrderDates.indexOf(d);
                if (index !== 1) {
                    oldOrderDates.splice(index, 1);
                }
            }
            for (let orderDate of orderDates) {
                let order = {
                    userId: mySubOrder.userId,
                    itemId: mySubOrder.itemId,
                    itemName: mySubOrder.itemName,
                    subItems: mySubOrder.subItems,
                    quantity: mySubOrder.quantity,
                    addressId: mySubOrder.addressId,
                    totalAmount: mySubOrder.totalAmount,
                    customerName: mySubOrder.customerName,
                    customerMobile: mySubOrder.customerMobile,
                    address: mySubOrder.address,
                    orderDate: orderDate,
                    orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    status: mySubOrder.status,
                    orderType: mySubOrder.orderType,
                    subscriptionId: mySubOrder.subscriptionId,
                    latitude: mySubOrder.latitude,
                    longitude: mySubOrder.longitude,
                    deliverySlot: mySubOrder.deliverySlot
                };
                console.log(order);
                createdItem = await this.orderModel.save(order);
                oldOrderDates.push(orderDate);
            }
            let dd = await this.mySubModel.update({ id: reqBody.subId }, { orderDates: JSON.stringify(oldOrderDates) });
            console.log(dd);
        }
        return createdItem;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrdersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(mysubscriptions_entity_1.MySubscriptionsEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(zoneMapping_entity_1.ZoneMappingEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(notifications_entity_1.NotificationsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        items_service_1.ItemsService,
        subscription_service_1.SubscriptionsService])
], OrdersService);
//# sourceMappingURL=order.service.js.map