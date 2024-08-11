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

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(ZonesEntity)
    private zoneRepo: Repository<ZonesEntity>
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

}
