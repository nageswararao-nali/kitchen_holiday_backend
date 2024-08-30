// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrdersEntity } from '../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/services/items.service';
import { SubscriptionsEntity } from '../models/subscription.entity';
import { MySubscriptionsEntity } from '../models/mysubscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionsEntity)
    private subRepo: Repository<SubscriptionsEntity>,
    @InjectRepository(MySubscriptionsEntity)
    private mySubRepo: Repository<MySubscriptionsEntity>
  ) {}

  findOne(id: number): Promise<SubscriptionsEntity> {
    return this.subRepo.findOneBy({id});
  }

  async list(reqBody: any): Promise<any> {
    let whereCon: any = {}
    if(reqBody.mobile) {
        whereCon['customerMobile'] = reqBody.mobile
    }
    if(reqBody.name) {
        whereCon['customerMobile'] = Like(`%${reqBody.name}%`)
    }
    if(reqBody.orderType) {
        whereCon['orderType'] = reqBody.orderType
    }
    if(reqBody.status) {
        whereCon['status'] = reqBody.status
    }
    if(reqBody.city) {
        whereCon['city'] = reqBody.city
    }
    if(reqBody.zipcode) {
        whereCon['zipcode'] = reqBody.zipcode
    }
    const [items, count] = await this.subRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  async getSubscription(reqBody: any): Promise<any> {
    const item = await this.subRepo.findOneBy({id: reqBody.id});
    return item;
  }

  async getMySubscriptions(reqBody: any): Promise<any> {
    let whereCon: any = {}
    if(reqBody.userId) {
        whereCon['userId'] = reqBody.userId
    }
    whereCon['isActive'] = true
    const [items, count] = await this.mySubRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  async addSubscription(reqBody: any): Promise<any> {
    let subscription = {
      name: reqBody.name,
      description: reqBody.description,
      price: reqBody.price,
      days: reqBody.days,
      isVeg: reqBody.isVeg
    }
    console.log(subscription)
    const createdItem = await this.subRepo.save(subscription);
    return createdItem;
  }  

}
