import { OrdersEntity } from '../models/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/services/items.service';
import { MySubscriptionsEntity } from '../models/mysubscriptions.entity';
import { SubscriptionsService } from './subscription.service';
import { ZoneMappingEntity } from '../models/zoneMapping.entity';
import { NotificationsEntity } from '../models/notifications.entity';
export declare class OrdersService {
    private orderModel;
    private mySubModel;
    private zoneMapRepo;
    private notiRepo;
    private userService;
    private itemSerivce;
    private subSerivce;
    constructor(orderModel: Repository<OrdersEntity>, mySubModel: Repository<MySubscriptionsEntity>, zoneMapRepo: Repository<ZoneMappingEntity>, notiRepo: Repository<NotificationsEntity>, userService: UsersService, itemSerivce: ItemsService, subSerivce: SubscriptionsService);
    findOne(id: number): Promise<OrdersEntity>;
    list(reqBody: any): Promise<any>;
    getOrder(reqBody: any): Promise<any>;
    addOrder(reqBody: any): Promise<any>;
    getOrderDates(startDate: any, noOrders: any, planDays: any): Promise<any>;
    sendBulkInvoice(invoiceData: any): Promise<any>;
    addUserOrder(reqBody: any): Promise<any>;
    updateOrderStatus(reqBody: any): Promise<any>;
    updateOrder(reqBody: any): Promise<any>;
    updateMySubscription(reqBody: any): Promise<any>;
}
