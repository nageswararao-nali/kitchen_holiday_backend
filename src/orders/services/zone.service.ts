// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrdersEntity } from '../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/services/items.service';
import { ZonesEntity } from '../models/zone.entity';
import { DeliverySlotsEntity } from '../models/deliverySlots.entity';
import { ZoneMappingEntity } from '../models/zoneMapping.entity';
import { Point } from 'geojson';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(ZonesEntity)
    private zoneRepo: Repository<ZonesEntity>,
    @InjectRepository(DeliverySlotsEntity)
    private dsRepo: Repository<DeliverySlotsEntity>,
    @InjectRepository(ZoneMappingEntity)
    private zoneMapRepo: Repository<ZoneMappingEntity>
  ) {}

  findOne(id: number): Promise<ZonesEntity> {
    return this.zoneRepo.findOneBy({id});
  }

  async getZones(reqBody: any): Promise<any> {
    let whereCon: any = {}
    const [items, count] = await this.zoneRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  
  async addZone(reqBody: any): Promise<any> {
    
    let subscription = {
      name: reqBody.name,
      zipcode: reqBody.zipcode
    }
    if(reqBody.latitude) {
      subscription['latitude'] = reqBody.latitude
      subscription['longitude'] = reqBody.longitude
      subscription['location'] = `POINT(${reqBody.latitude} ${reqBody.longitude})`
    }
    
    // const zoneData = await this.zoneRepo.findOne({where:{name: reqBody.name, zipcode: reqBody.zipcode, latitude: reqBody.latitude}})
    const zoneData = await this.zoneRepo.query(
      `SELECT *, ST_AsText(location) AS location FROM zones where name='${reqBody.name}' and zipcode='${reqBody.zipcode}' and latitude='${reqBody.latitude}';`
    );
    console.log("zoneData")
    console.log(zoneData)
    if(!zoneData.length) {
      console.log(subscription)
      const createdItem = await this.zoneRepo.save(subscription);
      return createdItem;
    }
    return zoneData
    // return uploadedData.Location
   
  }

  async editZone(reqBody: any): Promise<any> {
    let subscription = {
      name: reqBody.name,
      coordinates: reqBody.coordinates
    }
    const createdItem = await this.zoneRepo.update({id: reqBody.id}, subscription);
    return createdItem;
   
  }

  async deleteZone(reqBody: any): Promise<any> {
    const createdItem = await this.zoneRepo.delete({id: reqBody.id});
    return createdItem;
   
  }

  async getDeliverySlots(reqBody: any): Promise<any> {
    let whereCon: any = {}
    const [items, count] = await this.dsRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  
  async addDeliverySlot(reqBody: any): Promise<any> {
    let subscription = {
      name: reqBody.name,
      startTime: reqBody.startTime,
      endTime: reqBody.endTime
    }
    // return uploadedData.Location
    const createdItem = await this.dsRepo.save(subscription);
    return createdItem;
  }

  
  async addUserMapping(reqBody: any): Promise<any> {
    let mapping = await this.zoneMapRepo.findOneBy({userId: reqBody.userId})
    if(!mapping) {
      let zipMap = {
        userId: reqBody.userId,
        zipcodes: reqBody.zipcodes
      }
      // return uploadedData.Location
      const createdItem = await this.zoneMapRepo.save(zipMap);
      return createdItem;
    } else {
      const createdItem = await this.zoneMapRepo.update({userId: reqBody.userId}, {zipcodes: reqBody.zipcodes});
      return createdItem;
    }
  }

  async getUserMapping(reqBody: any): Promise<any> {
    const [items, count] = await this.zoneMapRepo.findAndCount({where: {userId: reqBody.userId}});
    return {items, count};
  }
  
}
