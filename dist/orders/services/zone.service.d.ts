import { Repository } from 'typeorm';
import { ZonesEntity } from '../models/zone.entity';
export declare class ZonesService {
    private zoneRepo;
    constructor(zoneRepo: Repository<ZonesEntity>);
    findOne(id: number): Promise<ZonesEntity>;
    getZones(reqBody: any): Promise<any>;
    addZone(reqBody: any): Promise<any>;
}
