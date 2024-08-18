import { Repository } from 'typeorm';
import { SubscriptionsEntity } from '../models/subscription.entity';
export declare class SubscriptionsService {
    private subRepo;
    constructor(subRepo: Repository<SubscriptionsEntity>);
    findOne(id: number): Promise<SubscriptionsEntity>;
    list(reqBody: any): Promise<any>;
    getOrder(reqBody: any): Promise<any>;
    addSubscription(reqBody: any): Promise<any>;
}
