// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrdersEntity } from '../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/services/items.service';
import { Subscription } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private orderModel: Repository<OrdersEntity>,
    private userService: UsersService,
    private itemSerivce: ItemsService
  ) {}

  findOne(id: number): Promise<OrdersEntity> {
    return this.orderModel.findOneBy({id});
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
    } else {
      whereCon['status'] = Not('cancelled')
    }
    if(reqBody.city) {
        whereCon['city'] = reqBody.city
    }
    if(reqBody.zipcode) {
        whereCon['zipcode'] = reqBody.zipcode
    }
    if(reqBody.orderDate) {
      whereCon['orderDate'] = reqBody.orderDate
    }
    if(reqBody.userId) {
      whereCon['userId'] = reqBody.userId
    }
    
    const [items, count] = await this.orderModel.findAndCount({where: whereCon, order:{created_at: 'DESC'} });
    return {items, count};
  }

  async getOrder(reqBody: any): Promise<any> {
    let orderData = {}
    const item = await this.orderModel.findOneBy({id: reqBody.id});
    if(item.deliveryParterId) {
      let deliveryBoy = await this.userService.findOneById(item.deliveryParterId)
      orderData = {...item, deliveryBoy: deliveryBoy}
    } else {
      orderData = item
    }
    return orderData;
  }

  async addOrder(reqBody: any): Promise<any> {
    console.log("add order")
    let addressData: any = {}
    let price = 0;
    // let customer = await this.userService.findOneById(reqBody.userId)
    if(!reqBody.addressId) {
        console.log("add order1")
        addressData = await this.userService.userDefaultAddressesByUserId(reqBody.userId)
        console.log("add order2")
    } else {
        addressData = await this.userService.findAddressById(reqBody.userId)
    }
    // let itemDetails = await this.itemSerivce.findOne(reqBody.itemId)
    console.log("add order3")
    let date = moment().format('YYYY-MM-DD')
    console.log(date)
    let order = {
      userId: reqBody.userId,
      itemId: reqBody.itemId,
      itemName: reqBody.itemName,
      subItems: reqBody.subItems,
      quantity: reqBody.quantity,
      addressId: addressData.id,
      totalAmount: price,
      customerName: addressData.fName + " " + addressData.lName,
      customerMobile: addressData.mobile,
      address: addressData.address + " " + addressData.address1 + " " + addressData.city + " " + addressData.zipcode,
      orderDate: moment().format('YYYY-MM-DD'),
      orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: 'new',
      orderType: 'normal'
    }
    
    // return uploadedData.Location
    const createdItem = await this.orderModel.save(order);
    return createdItem;
  }

  async getOrderDates(startDate, noOrders, planDays): Promise<any> {
      const orders = [];
      let currentDate = new Date(startDate);
      
      while (orders.length < noOrders) {
        const dayOfWeek = currentDate.getDay();
    
        if (planDays.indexOf(dayOfWeek) > -1) {
          console.log(currentDate)
          orders.push(moment(currentDate).format('YYYY-MM-DD'));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    
      return orders;
        
  }

  async addUserOrder(reqBody: any): Promise<any> {
    console.log("add order")
    let createdItem = {}
    let subItems = {}
    for(let subItemId of reqBody.subItems) {
      if(!subItems[subItemId]) {
        subItems[subItemId] = 0
      }
      subItems[subItemId] = subItems[subItemId]+1
    }
    if(reqBody.extraSubItems && reqBody.extraSubItems.length) {
      for(let subItemId of reqBody.extraSubItems) {
        if(!subItems[subItemId]) {
          subItems[subItemId] = 0
        }
        subItems[subItemId] = subItems[subItemId]+1
      }
    }
    let orderDates = await this.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan);
    console.log(orderDates)
    for(let orderDate of orderDates) {
      let order = {
        userId: reqBody.userId,
        itemId: reqBody.itemId,
        itemName: reqBody.itemName,
        subItems: JSON.stringify(subItems),
        quantity: reqBody.quantity,
        addressId: reqBody.addressId,
        totalAmount: reqBody.totalAmount,
        customerName: reqBody.customerName,
        customerMobile: reqBody.mobile,
        address: reqBody.address,
        orderDate: orderDate,
        orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: reqBody.status,
        orderType: reqBody.orderType,
        subscriptionId: reqBody.subscriptionId,
        latitude: reqBody.latitude,
        longitude: reqBody.longitude
      }
      console.log(order)
      createdItem = await this.orderModel.save(order);
    }
    return createdItem
  }

  async updateOrderStatus(reqBody: any): Promise<any> {
    let order = await this.orderModel.update({id: reqBody.orderId}, {status: reqBody.status})
    return order
  }

  async updateOrder(reqBody: any): Promise<any> {
    let order = await this.orderModel.update({id: reqBody.orderId}, reqBody.updateData)
    return order
  }
  

  // async uploadS3(file, bucket, name) {
  //   const s3 = this.getS3();
  //   const params = {
  //       Bucket: bucket,
  //       Key: String(name),
  //       Body: file,
  //   };
  //   return new Promise((resolve, reject) => {
  //       s3.upload(params, (err, data) => {
  //       if (err) {
  //           reject(err.message);
  //       }
  //       resolve(data);
  //       });
  //   });
  // }

  // getS3() {
  //   return new S3({
  //       accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
  //       secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
  //   });
  // }

  // async update(id: string, item: ItemEntity): Promise<ItemEntity> {
  //   // return this.itemModel.findByIdAndUpdate(id, item, { new: true }).exec();
  // }

  async remove(id: string): Promise<any> {
    // return this.itemModel.findByIdAndRemove(id).exec();
    return;
  }
}
