export declare class RefundsEntity {
    id: number;
    userId: string;
    customerName: string;
    customerMobile: string;
    customerEmail: string;
    amount: number;
    orderIds: string;
    itemName: string;
    refundRaisedDate: string;
    refundIssuedDate: string;
    approved: boolean;
    approved_by: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
