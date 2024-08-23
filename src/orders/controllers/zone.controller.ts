// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ZonesService } from '../services/zone.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('zones')
// @UseGuards(JwtAuthGuard)
export class ZonesController {
  constructor(private readonly zoneService: ZonesService) {}

  @Post('getZones')
  async getZones(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Zones list'
    }
    const {items, count} = await this.zoneService.getZones(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting zones list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('addZone')
  async addZone(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.zoneService.addZone(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding zone";
      } else {
          response.data = order
      }
      return response
  }

  @Post('getDeliverySlots')
  async getDeliverySlots(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Zones list'
    }
    const {items, count} = await this.zoneService.getDeliverySlots(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting zones list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('addDeliverySlot')
  async addDeliverySlot(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const order = await this.zoneService.addDeliverySlot(reqBody)
      if (!order) {
          response.success = false;
          response.message = "problem in adding zone";
      } else {
          response.data = order
      }
      return response
  }
  
}
