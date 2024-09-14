// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
// @UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('getPayments')
  async getPayments(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'payments list'
    }
    const {items, count} = await this.paymentsService.getPayments(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting zones list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('getRefunds')
  async getRefunds(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'payments list'
    }
    const {items, count} = await this.paymentsService.getRefunds(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting Refunds list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }
  @UseGuards(JwtAuthGuard)
  @Post('updateRefund')
  async updateRefund(@Request() req: any, @Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.paymentsService.updateRefund(req.user, reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding Refund";
      } else {
          response.data = order
      }
      return response
  }
  
}
