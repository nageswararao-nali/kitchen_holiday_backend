import { OrdersEntity } from '../models/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/services/items.service';
export declare class OrdersService {
    private orderModel;
    private userService;
    private itemSerivce;
    constructor(orderModel: Repository<OrdersEntity>, userService: UsersService, itemSerivce: ItemsService);
    findOne(id: number): Promise<OrdersEntity>;
    list(reqBody: any): Promise<any>;
    getOrder(reqBody: any): Promise<any>;
    addOrder(reqBody: any): Promise<any>;
    getOrderDates(startDate: any, noOrders: any, planDays: any): Promise<any>;
    addUserOrder(reqBody: any): Promise<any>;
    updateOrderStatus(reqBody: any): Promise<any>;
    updateOrder(reqBody: any): Promise<any>;
    remove(id: string): Promise<any>;
}
