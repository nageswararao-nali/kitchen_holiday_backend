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
import { MySubscriptionsEntity } from '../models/mysubscriptions.entity';
import { SubscriptionsService } from './subscription.service';
import { ZoneMappingEntity } from '../models/zoneMapping.entity';
import { NotificationsEntity } from '../models/notifications.entity';
import * as pdf from 'html-pdf'
import * as fs from 'fs'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private orderModel: Repository<OrdersEntity>,
    @InjectRepository(MySubscriptionsEntity)
    private mySubModel: Repository<MySubscriptionsEntity>,
    @InjectRepository(ZoneMappingEntity)
    private zoneMapRepo: Repository<ZoneMappingEntity>,
    @InjectRepository(NotificationsEntity)
    private notiRepo: Repository<NotificationsEntity>,
    private userService: UsersService,
    private itemSerivce: ItemsService,
    private subSerivce: SubscriptionsService
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

  async sendBulkInvoice(invoiceData: any): Promise<any> {
    
    const pdfOptions: any = {
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      }
    }
    let data =[]
    // //console.log(data)
    // for await (let row of data.rows) {
      // //console.log(row)
          
    var template = './public/invoice.html'
    var pdf_path = './public/invoice.pdf'
    // //console.log(template)
    var html = fs.readFileSync(template, 'utf8');
    
    
    // //console.log(html)
    let pdfCreate =  (html, pdfOptions, pdf_path) => new Promise((resolve, reject) => {
        pdf.create(html, pdfOptions).toFile(pdf_path, function(err, res1) {
            if (err) return //console.log(err);
            //console.log("res1"); // { filename: '/app/businesscard.pdf' }
            //console.log(res1); // { filename: '/app/businesscard.pdf' }
            // fs.existsSync(res1.filename)
            
            resolve(pdf_path)
            
            
            });
    })
    await pdfCreate(html, pdfOptions, pdf_path)
    return pdf_path
    
}

  async addUserOrder(reqBody: any): Promise<any> {
    console.log("add order")
    let createdItem: any = {}
    let subItems = {}
    for(let subItemId of reqBody.subItems) {
      if(!subItems[subItemId]) {
        subItems[subItemId] = 0
      }
      subItems[subItemId] = subItems[subItemId]+1
    }
    if(reqBody.extraSubItems && reqBody.extraSubItems.length) {
      for(let subItemIdData of reqBody.extraSubItems) {
        if(!subItems[subItemIdData.itemId]) {
          subItems[subItemIdData.itemId] = 0
        }
        subItems[subItemIdData.itemId] = subItems[subItemIdData.itemId]+subItemIdData.quantity
      }
    }
    let zoneMapping = await this.zoneMapRepo.find({where:{zipcodes: Like(`%${reqBody.zipcode}%`)}})
    if(reqBody.startDate) {
      let orderDates = await this.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan);
      console.log(orderDates)
      let subscription = await this.subSerivce.getSubscription({id: reqBody.subscriptionId})
      let mySubObj = {
        itemId: reqBody.itemId,
        itemName: reqBody.itemName,
        subItems: JSON.stringify(subItems),
        quantity: reqBody.quantity,
        startDate: reqBody.startDate,
        endDate: orderDates[orderDates.length -1],
        userId: reqBody.userId,
        subId: reqBody.subscriptionId,
        subName: subscription.name,
        price: reqBody.totalAmount,
        orderDates: JSON.stringify(orderDates),
        selectedPlan: JSON.stringify(reqBody.selectedPlan)
      }
      let muSub = await this.mySubModel.save(mySubObj)
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
          longitude: reqBody.longitude,
          deliverySlot: reqBody.deliverySlot,
          mySubId: muSub.id,
          deliveryParterId: (zoneMapping && zoneMapping.length) ? parseInt(zoneMapping[0].userId) : 0
        }
        console.log(order)
        createdItem = await this.orderModel.save(order);
        if(zoneMapping && zoneMapping.length) {
          let noti = {
            userId: zoneMapping[0].userId,
            content: 'Order Assigned #'+createdItem.id,
            created_at: new Date()

          }
          await this.notiRepo.save(noti)
        }
        let invoicePath = await this.sendBulkInvoice({})
        console.log("invoicePath")
        console.log(invoicePath)
      }
      
    } else {
      console.log("-----")
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
        orderDate: moment().format('YYYY-MM-DD'),
        orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: reqBody.status,
        orderType: reqBody.orderType,
        subscriptionId: 0,
        latitude: reqBody.latitude,
        longitude: reqBody.longitude,
        deliverySlot: reqBody.deliverySlot
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

  async updateMySubscription(reqBody: any): Promise<any> {
    console.log("add order")
    let mySub = await this.mySubModel.findOneBy({id: reqBody.subId})
    let createdItem = {}
    
    if(reqBody.mySubLastDate) {
      let mySubOrder = await this.orderModel.findOneBy({mySubId: reqBody.subId})
      let currentDate = new Date(reqBody.mySubLastDate)
      let startDate = currentDate.setDate(currentDate.getDate() + 1);
      let orderDates = await this.getOrderDates(startDate, reqBody.dates.length, JSON.parse(mySub.selectedPlan));
      console.log(orderDates)
      let oldOrderDates = JSON.parse(mySub.orderDates)
      for(let d of reqBody.dates) {
        let index = oldOrderDates.indexOf(d)
        if(index !== 1) {
          oldOrderDates.splice(index, 1);
        }
      }
      for(let orderDate of orderDates) {
        let order = {
          userId: mySubOrder.userId,
          itemId: mySubOrder.itemId,
          itemName: mySubOrder.itemName,
          subItems: mySubOrder.subItems,
          quantity: mySubOrder.quantity,
          addressId: mySubOrder.addressId,
          totalAmount: mySubOrder.totalAmount,
          customerName: mySubOrder.customerName,
          customerMobile: mySubOrder.customerMobile,
          address: mySubOrder.address,
          orderDate: orderDate,
          orderDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          status: mySubOrder.status,
          orderType: mySubOrder.orderType,
          subscriptionId: mySubOrder.subscriptionId,
          latitude: mySubOrder.latitude,
          longitude: mySubOrder.longitude,
          deliverySlot: mySubOrder.deliverySlot
        }
        console.log(order)
        createdItem = await this.orderModel.save(order);
        oldOrderDates.push(orderDate)
      }
      
      let dd = await this.mySubModel.update({id: reqBody.subId}, {orderDates: JSON.stringify(oldOrderDates)})
      console.log(dd)
    }
    
    return createdItem
  }
  
  
}
