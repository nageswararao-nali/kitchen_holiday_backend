// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { ItemEntity } from './models/item.entity';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './models/category.entity';
import { CategoryService } from './services/category.service';
import { CategoriesController } from './controllers/category.controller';
import { SubItemEntity } from './models/subItem.entity';
import { ItemMappingEntity } from './models/itemMapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity, CategoriesEntity, SubItemEntity, ItemMappingEntity]),
    UsersModule, // Include UsersModule here
  ],
  providers: [ItemsService, CategoryService],
  controllers: [ItemsController, CategoriesController],
  exports: [ItemsService]
})
export class ItemsModule {}
