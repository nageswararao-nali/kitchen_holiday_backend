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

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(ZonesEntity)
    private zoneRepo: Repository<ZonesEntity>,
    @InjectRepository(DeliverySlotsEntity)
    private dsRepo: Repository<DeliverySlotsEntity>
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
      coordinates: reqBody.coordinates
    }
    // return uploadedData.Location
    const createdItem = await this.zoneRepo.save(subscription);
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

}
