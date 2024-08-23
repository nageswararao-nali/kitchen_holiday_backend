import { Repository } from 'typeorm';
import { ZonesEntity } from '../models/zone.entity';
import { DeliverySlotsEntity } from '../models/deliverySlots.entity';
export declare class ZonesService {
    private zoneRepo;
    private dsRepo;
    constructor(zoneRepo: Repository<ZonesEntity>, dsRepo: Repository<DeliverySlotsEntity>);
    findOne(id: number): Promise<ZonesEntity>;
    getZones(reqBody: any): Promise<any>;
    addZone(reqBody: any): Promise<any>;
    getDeliverySlots(reqBody: any): Promise<any>;
    addDeliverySlot(reqBody: any): Promise<any>;
}
