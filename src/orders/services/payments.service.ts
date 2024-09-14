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
import { PaymentsEntity } from '../models/payments.entity';
import { RefundsEntity } from '../models/refund.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private paymentRepo: Repository<PaymentsEntity>,
    @InjectRepository(RefundsEntity)
    private refundRepo: Repository<RefundsEntity>
  ) {}

  async getPayments(reqBody: any): Promise<any> {
    let whereCon: any = {}
    if(reqBody.user_id) {
        whereCon['user_id'] = reqBody.user_id
    }
    console.log(whereCon)
    const [items, count] = await this.paymentRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }
  
  async getRefunds(reqBody: any): Promise<any> {
    let whereCon: any = {}
    if(reqBody.user_id) {
        whereCon['user_id'] = reqBody.user_id
    }
    const [items, count] = await this.refundRepo.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  async updateRefund(user: any, reqBody: any): Promise<any> {
    let refund = await this.refundRepo.findOneBy({id: reqBody.id})
    if(refund) {
        let refundData = {
            refundIssuedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            approved: true,
            approved_by: user.id
        }
      const createdItem = await this.refundRepo.update({id: reqBody.id}, refundData);
      return createdItem;
    }
    return false
  }

}
