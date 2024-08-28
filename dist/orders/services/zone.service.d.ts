import { Repository } from 'typeorm';
import { ZonesEntity } from '../models/zone.entity';
import { DeliverySlotsEntity } from '../models/deliverySlots.entity';
import { ZoneMappingEntity } from '../models/zoneMapping.entity';
export declare class ZonesService {
    private zoneRepo;
    private dsRepo;
    private zoneMapRepo;
    constructor(zoneRepo: Repository<ZonesEntity>, dsRepo: Repository<DeliverySlotsEntity>, zoneMapRepo: Repository<ZoneMappingEntity>);
    findOne(id: number): Promise<ZonesEntity>;
    getZones(reqBody: any): Promise<any>;
    addZone(reqBody: any): Promise<any>;
    getDeliverySlots(reqBody: any): Promise<any>;
    addDeliverySlot(reqBody: any): Promise<any>;
    addUserMapping(reqBody: any): Promise<any>;
    getUserMapping(reqBody: any): Promise<any>;
}
