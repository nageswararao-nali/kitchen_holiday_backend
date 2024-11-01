// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OrdersService } from '../services/order.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('orders')
// @UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('getOrders')
  async getOrders(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Items list'
    }
    const {items, count} = await this.orderService.list(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting categories list the user";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('deliveryOrders')
  async deliveryOrders(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'orders list'
    }
    const {items, count} = await this.orderService.deliveryOrders(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting categories list the user";
    } else {
      response.data = {items, count}
    }
    
    return response
  }
  

  @Post('getOrder')
  async getOrder(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Items list'
    }
    const order = await this.orderService.getOrder(reqBody)
    if(!order) {
        response.success = false;
        response.message = "Problem in getting order";
    } else {
      response.data = order
    }
    
    
    return response
  }

  @Post('addOrder')
  async addOrder(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.orderService.addOrder(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding order";
      } else {
          response.data = order
      }
      return response
  }

  @Post('addUserOrder')
  async addUserOrder(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.orderService.addUserOrder(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding order";
      } else {
          response.data = order
      }
      return response
  }
  

  @Post('updateOrderStatus')
  async updateOrderStatus(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.orderService.updateOrderStatus(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in updating order";
      } else {
          response.data = order
      }
      return response
  }

  @Post('updateOrder')
  async updateOrder(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.orderService.updateOrder(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in updating order";
      } else {
          response.data = order
      }
      return response
  }

  @Post('updateMySubscription')
  async updateMySubscription(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const sub = await this.orderService.updateMySubscription(reqBody)
    if(!sub) {
        response.success = false;
        response.message = "Problem in getting subscriptions list the user";
    } else {
      response.data = sub
    }
    
    return response
  }

  @Post('deleteMySubscription')
  async deleteMySubscription(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const sub = await this.orderService.deleteMySubscription(reqBody)
    if(!sub) {
        response.success = false;
        response.message = "Problem in getting subscriptions list the user";
    } else {
      response.data = sub
    }
    
    return response
  }
  

  @Post('getOrderDates')
  async getOrderDates(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const sub = await this.orderService.getOrderDates(reqBody.startDate, reqBody.noOrders, reqBody.selectedPlan)
    if(!sub) {
        response.success = false;
        response.message = "Problem in getting subscriptions list the user";
    } else {
      response.data = sub
    }
    
    return response
  }

  @Post('getTodayOrdersReport')
  async getTodayOrdersReport(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const sub = await this.orderService.getTodayOrdersReport(reqBody)
    if(!sub) {
        response.success = false;
        response.message = "Problem in getting today order details";
    } else {
      response.data = sub
    }
    
    return response
  }
  
  @Post('uploadDeliveryImage')
  @UseInterceptors(FileInterceptor('deliveryImage'))
  async uploadDeliveryImage(@Body() reqBody: any, @UploadedFile() itemImage: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const odometerUpload = await this.orderService.uploadDeliveryImage(itemImage, reqBody)
      if (!odometerUpload) {
          response.success = false;
          response.message = "Problem in adding item";
      } else {
          response.data = odometerUpload
      }
      return response
  }

  @Post('dashboardDetails')
  async dashboardDetails(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Dashboard details'
    }
    const sub = await this.orderService.dashboardDetails(reqBody)
    if(!sub) {
        response.success = false;
        response.message = "Problem in getting today order details";
    } else {
      response.data = sub
    }
    
    return response
  }
  
}
