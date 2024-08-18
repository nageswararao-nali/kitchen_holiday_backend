import { ItemEntity } from '../models/item.entity';
import { Repository } from 'typeorm';
import { SubItemEntity } from '../models/subItem.entity';
import { ItemMappingEntity } from '../models/itemMapping.entity';
import { S3 } from 'aws-sdk';
export declare class ItemsService {
    private itemModel;
    private subItemModel;
    private itemMappingModel;
    constructor(itemModel: Repository<ItemEntity>, subItemModel: Repository<SubItemEntity>, itemMappingModel: Repository<ItemMappingEntity>);
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
}
