// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubscriptionsService } from '../services/subscription.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subscriptions')
// @UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Post('getSubscriptions')
  async getSubscriptions(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const {items, count} = await this.subscriptionService.list(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting categories list the user";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('addSubscription')
  async addSubscription(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.subscriptionService.addSubscription(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding order";
      } else {
          response.data = order
      }
      return response
  }

  @Post('getMySubscriptions')
  async getMySubscriptions(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Subscriptions list'
    }
    const {items, count} = await this.subscriptionService.getMySubscriptions(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting subscriptions list the user";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('deleteSubscription')
  async deleteSubscription(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.subscriptionService.deleteSubscription(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding order";
      } else {
          response.data = order
      }
      return response
  }
  
}
