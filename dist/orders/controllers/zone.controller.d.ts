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
}
