import { ItemEntity } from '../models/item.entity';
import { Repository } from 'typeorm';
import { SubItemEntity } from '../models/subItem.entity';
import { ItemMappingEntity } from '../models/itemMapping.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
export declare class ItemsService {
    private itemModel;
    private subItemModel;
    private itemMappingModel;
    private configService;
    constructor(itemModel: Repository<ItemEntity>, subItemModel: Repository<SubItemEntity>, itemMappingModel: Repository<ItemMappingEntity>, configService: ConfigService);
    findAll(): Promise<ItemEntity[]>;
    findOne(id: number): Promise<ItemEntity>;
    list(reqBody: any): Promise<any>;
    getItem(reqBody: any): Promise<any>;
    addItem(file: any, reqBody: any): Promise<any>;
    uploadS3(file: any, bucket: any, name: any): Promise<unknown>;
    getS3(): S3;
    getSubItems(reqBody: any): Promise<any>;
    getSubItem(reqBody: any): Promise<any>;
    addSubItem(file: any, reqBody: any): Promise<any>;
    addItemMapping(reqBody: any): Promise<any>;
    getItemMappings(reqBody: any): Promise<any>;
    deleteItem(reqBody: any): Promise<any>;
    deleteSubItem(reqBody: any): Promise<any>;
}
