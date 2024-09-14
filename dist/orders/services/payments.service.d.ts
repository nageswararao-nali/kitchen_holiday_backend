import { Repository } from 'typeorm';
import { PaymentsEntity } from '../models/payments.entity';
import { RefundsEntity } from '../models/refund.entity';
export declare class PaymentsService {
    private paymentRepo;
    private refundRepo;
    constructor(paymentRepo: Repository<PaymentsEntity>, refundRepo: Repository<RefundsEntity>);
    getPayments(reqBody: any): Promise<any>;
    getRefunds(reqBody: any): Promise<any>;
    updateRefund(user: any, reqBody: any): Promise<any>;
}
