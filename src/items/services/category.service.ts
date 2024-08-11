// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { CategoriesEntity } from '../models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoryRepo: Repository<CategoriesEntity>,
  ) {}

  async list(reqBody: any): Promise<any> {
    const [items, count] = await this.categoryRepo.findAndCount({});
    return {items, count};
  }
  
}
