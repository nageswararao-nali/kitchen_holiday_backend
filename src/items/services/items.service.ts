// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ItemEntity } from '../models/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubItemEntity } from '../models/subItem.entity';
import { ItemMappingEntity } from '../models/itemMapping.entity';
import * as fs  from 'fs';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemModel: Repository<ItemEntity>,
    @InjectRepository(SubItemEntity)
    private subItemModel: Repository<SubItemEntity>,
    @InjectRepository(ItemMappingEntity)
    private itemMappingModel: Repository<ItemMappingEntity>,
    private configService: ConfigService
  ) {}

  findAll(): Promise<ItemEntity[]> {
    return this.itemModel.find();
  }

  findOne(id: number): Promise<ItemEntity> {
    return this.itemModel.findOneBy({id});
  }
  async list(reqBody: any): Promise<any> {
    const [items, count] = await this.itemModel.findAndCount({});
    return {items, count};
  }

  async getItem(reqBody: any): Promise<any> {
    const item = await this.itemModel.findOneBy({id: reqBody.id});
    return item;
  }

  

  async addItem(file, reqBody: any): Promise<any> {
    let createdItem = null
    let imagePath = "";
    if(file) {
      console.log("uploading file")
      const { originalname } = file;
      const bucketS3 = 'kitchen-holiday-images';
      const uploadedData: any = await this.uploadS3(file.buffer, bucketS3, originalname);
      imagePath = uploadedData.Location
    }
    let item = {
      name: reqBody.name,
      category: reqBody.category,
      description: reqBody.description,
      image: imagePath,
      isVeg: reqBody.isVeg,
      price: reqBody.price
    }
    
    // return uploadedData.Location
    if(reqBody.id) {
      createdItem = await this.itemModel.update({id: reqBody.id}, item);
    } else {
      createdItem = await this.itemModel.save(item);
    }
    
    return createdItem;
  }

  async editItem(file, reqBody: any): Promise<any> {
    let itemData = await this.itemModel.findOneBy({id: reqBody.id});
    let imagePath = itemData.image;
    if(file) {
      console.log("uploading file")
      const { originalname } = file;
      const bucketS3 = 'kitchen-holiday-images';
      const uploadedData: any = await this.uploadS3(file.buffer, bucketS3, originalname);
      imagePath = uploadedData.Location
    }
    let item = {
      name: reqBody.name,
      category: reqBody.category,
      description: reqBody.description,
      image: imagePath,
      isVeg: reqBody.isVeg,
      price: reqBody.price
    }
    
    // return uploadedData.Location
    const createdItem = await this.itemModel.update({id: reqBody.id}, item);
    return createdItem;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
        Bucket: bucket,
        Key: String(name),
        Body: file,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
        if (err) {
            reject(err.message);
        }
        resolve(data);
        });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    });
  }

  async getSubItems(reqBody: any): Promise<any> {
    const [items, count] = await this.subItemModel.findAndCount({});
    return {items, count};
  }

  async getSubItem(reqBody: any): Promise<any> {
    const item = await this.subItemModel.findOneBy({id: reqBody.id});
    return item;
  }

  async addSubItem(file, reqBody: any): Promise<any> {
    let createdItem = null
    let imagePath = "";
    if(file) {
      const { originalname } = file;
      const bucketS3 = 'kitchen-holiday-images';
      const uploadedData: any = await this.uploadS3(file.buffer, bucketS3, originalname);
      imagePath = uploadedData.Location
    }
    let item = {
      name: reqBody.name,
      description: reqBody.description,
      isVeg: reqBody.isVeg,
      image: imagePath,
      quantity: reqBody.quantity,
      price: reqBody.price
    }
    
    // return uploadedData.Location
    if(reqBody.id) {
      createdItem = await this.subItemModel.update({id: reqBody.id}, item);
    } else {
      createdItem = await this.subItemModel.save(item);
    }
    
    return createdItem;
  }
  async editSubItem(file, reqBody: any): Promise<any> {
    let itemData = await this.subItemModel.findOneBy({id: reqBody.id});
    let imagePath = itemData.image;
    if(file) {
      const { originalname } = file;
      const bucketS3 = 'kitchen-holiday-images';
      const uploadedData: any = await this.uploadS3(file.buffer, bucketS3, originalname);
      imagePath = uploadedData.Location
    }
    let item = {
      name: reqBody.name,
      description: reqBody.description,
      isVeg: reqBody.isVeg,
      image: imagePath,
      quantity: reqBody.quantity,
      price: reqBody.price
    }
    
    // return uploadedData.Location
    const createdItem = await this.subItemModel.update({id: reqBody.id}, item);
    return createdItem;
  }
  async addItemMapping(reqBody: any): Promise<any> {
    let mapping = await this.itemMappingModel.findOneBy({itemId: reqBody.itemId})
    if(!mapping) {
      let item = {
        itemId: reqBody.itemId,
        subItemsIds: JSON.stringify(reqBody.subItemIds)
      }
      
      // return uploadedData.Location
      const createdItem = await this.itemMappingModel.save(item);
      return createdItem;
    } else {
      const createdItem = await this.itemMappingModel.update({itemId: reqBody.itemId}, {subItemIds: JSON.stringify(reqBody.subItemIds)});
      return createdItem;
    }
    
    
  }
  
  async getItemMappings(reqBody: any): Promise<any> {
    const [items, count] = await this.itemMappingModel.findAndCount({where: {itemId: reqBody.itemId}});
    return {items, count};
  }

  async deleteItem(reqBody: any): Promise<any> {
    const item = await this.itemModel.delete({id: reqBody.id});
    return item;
  }
  async deleteSubItem(reqBody: any): Promise<any> {
    const item = await this.subItemModel.delete({id: reqBody.id});
    return item;
  }
  
}
