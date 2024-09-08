import { ZonesService } from '../services/zone.service';
export declare class ZonesController {
    private readonly zoneService;
    constructor(zoneService: ZonesService);
    getZones(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addZone(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    editZone(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    deleteZone(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    addUserMapping(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    getUserMapping(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
    getDeliverySlots(reqBody: any): Promise<{
        data: {};
        success: boolean;
        message: string;
    }>;
    addDeliverySlot(reqBody: any): Promise<{
        success: boolean;
        data: {};
        message: string;
    }>;
}
