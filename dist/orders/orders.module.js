"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const items_module_1 = require("../items/items.module");
const order_controller_1 = require("./controllers/order.controller");
const order_service_1 = require("./services/order.service");
const order_entity_1 = require("./models/order.entity");
const subscription_entity_1 = require("./models/subscription.entity");
const subscription_controller_1 = require("./controllers/subscription.controller");
const subscription_service_1 = require("./services/subscription.service");
const zone_controller_1 = require("./controllers/zone.controller");
const zone_service_1 = require("./services/zone.service");
const zone_entity_1 = require("./models/zone.entity");
const deliverySlots_entity_1 = require("./models/deliverySlots.entity");
const mysubscriptions_entity_1 = require("./models/mysubscriptions.entity");
const zoneMapping_entity_1 = require("./models/zoneMapping.entity");
const notifications_entity_1 = require("./models/notifications.entity");
const payments_entity_1 = require("./models/payments.entity");
const refund_entity_1 = require("./models/refund.entity");
const payments_controller_1 = require("./controllers/payments.controller");
const payments_service_1 = require("./services/payments.service");
const orderLocations_entity_1 = require("./models/orderLocations.entity");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.OrdersEntity, subscription_entity_1.SubscriptionsEntity, zone_entity_1.ZonesEntity,
                deliverySlots_entity_1.DeliverySlotsEntity, mysubscriptions_entity_1.MySubscriptionsEntity, zoneMapping_entity_1.ZoneMappingEntity,
                notifications_entity_1.NotificationsEntity, payments_entity_1.PaymentsEntity, refund_entity_1.RefundsEntity, orderLocations_entity_1.OrderLocationsEntity]),
            users_module_1.UsersModule,
            items_module_1.ItemsModule
        ],
        providers: [order_service_1.OrdersService, order_entity_1.OrdersEntity, subscription_entity_1.SubscriptionsEntity, subscription_service_1.SubscriptionsService, zone_service_1.ZonesService, payments_service_1.PaymentsService],
        controllers: [order_controller_1.OrdersController, subscription_controller_1.SubscriptionsController, zone_controller_1.ZonesController, payments_controller_1.PaymentsController],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map