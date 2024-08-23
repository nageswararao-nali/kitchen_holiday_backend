import { SubscriptionsService } from '../services/subscription.service';
export declare class SubscriptionsController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionsService);
    getSubscriptions(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addSubscription(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    getMySubscriptions(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
}
