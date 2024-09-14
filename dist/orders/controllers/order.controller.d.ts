import { OrdersService } from '../services/order.service';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    getOrders(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    deliveryOrders(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getOrder(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addOrder(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    addUserOrder(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    updateOrderStatus(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    updateOrder(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    updateMySubscription(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    deleteMySubscription(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getOrderDates(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getTodayOrdersReport(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    uploadDeliveryImage(reqBody: any, itemImage: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
}
