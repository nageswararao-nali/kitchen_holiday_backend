// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { ItemEntity } from '../models/item.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('items')
// @UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('list')
  async getItems(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Items list'
    }
    const {items, count} = await this.itemsService.list(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting categories list the user";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('getItem')
  async getItem(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Item found'
    }
    const item = await this.itemsService.getItem(reqBody)
    if(!item) {
        response.success = false;
        response.message = "Problem in getting item";
    } else {
      response.data = item
    }
    
    return response
  }

  

  @Post('add')
  @UseInterceptors(FileInterceptor('itemImage'))
  async addItem(@Body() reqBody: any, @UploadedFile() itemImage: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const odometerUpload = await this.itemsService.addItem(itemImage, reqBody)
      if (!odometerUpload) {
          response.success = false;
          response.message = "Problem in adding item";
      } else {
          response.data = odometerUpload
      }
      return response
  }

  @Post('getSubItems')
  async getSubItems(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Sub Items list'
    }
    const {items, count} = await this.itemsService.getSubItems(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting sub item list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

  @Post('getSubItem')
  async getSubItem(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Item found'
    }
    const item = await this.itemsService.getSubItem(reqBody)
    if(!item) {
        response.success = false;
        response.message = "Problem in getting item";
    } else {
      response.data = item
    }
    
    return response
  }

  

  @Post('addSubItem')
  @UseInterceptors(FileInterceptor('itemImage'))
  async addSubItem(@Body() reqBody: any, @UploadedFile() itemImage: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const odometerUpload = await this.itemsService.addSubItem(itemImage, reqBody)
      if (!odometerUpload) {
          response.success = false;
          response.message = "problem in adding sub item";
      } else {
          response.data = odometerUpload
      }
      return response
  }

  @Post('addItemMapping')
  async addItemMapping(@Body() reqBody: any) {
      let response = {
          success: true,
          data: {},
          message: ''
      }
      const odometerUpload = await this.itemsService.addItemMapping(reqBody)
      if (!odometerUpload) {
          response.success = false;
          response.message = "problem in adding sub item";
      } else {
          response.data = odometerUpload
      }
      return response
  }
  
  @Post('getItemMappings')
  async getItemMappings(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Sub Items list'
    }
    const {items, count} = await this.itemsService.getItemMappings(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting sub item list";
    } else {
      response.data = {items, count}
    }
    
    return response
  }

}
