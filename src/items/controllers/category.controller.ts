// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ItemEntity } from '../models/item.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('categories')
// @UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   findAll() {
//     return this.categoryService.findAll();
//   }

  @Post('list')
  async totalUsers(@Body() reqBody: any) {
    let response = {
      data: {},
      success: true,
      message: 'Category list'
    }
    const {items, count} = await this.categoryService.list(reqBody)
    if(!count) {
        response.success = false;
        response.message = "Problem in getting categories list the user";
    } else {
      response.data = {categories: items, count}
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
