import { Repository } from 'typeorm';
import { SubscriptionsEntity } from '../models/subscription.entity';
import { MySubscriptionsEntity } from '../models/mysubscriptions.entity';
export declare class SubscriptionsService {
    private subRepo;
    private mySubRepo;
    constructor(subRepo: Repository<SubscriptionsEntity>, mySubRepo: Repository<MySubscriptionsEntity>);
    findOne(id: number): Promise<SubscriptionsEntity>;
    list(reqBody: any): Promise<any>;
    getSubscription(reqBody: any): Promise<any>;
    getMySubscriptions(reqBody: any): Promise<any>;
    addSubscription(reqBody: any): Promise<any>;
    deleteSubscription(reqBody: any): Promise<any>;
}
