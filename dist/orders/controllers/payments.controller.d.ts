import { PaymentsService } from '../services/payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getPayments(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    getRefunds(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    updateRefund(req: any, reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
}
