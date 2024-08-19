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

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Item> {
//     return this.itemsService.findOne(id);
//   }

//   @Post()
//   create(@Body() item: Item): Promise<Item> {
//     return this.itemsService.create(item);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() item: Item): Promise<Item> {
//     return this.itemsService.update(id, item);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<any> {
//     return this.itemsService.remove(id);
//   }
}
