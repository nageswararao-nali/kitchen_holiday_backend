// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { OrdersController } from './controllers/order.controller';
import { OrdersService } from './services/order.service';
import { OrdersEntity } from './models/order.entity';
import { SubscriptionsEntity } from './models/subscription.entity';
import { SubscriptionsController } from './controllers/subscription.controller';
import { SubscriptionsService } from './services/subscription.service';
import { ZonesController } from './controllers/zone.controller';
import { ZonesService } from './services/zone.service';
import { ZonesEntity } from './models/zone.entity';
import { DeliverySlotsEntity } from './models/deliverySlots.entity';
import { MySubscriptionsEntity } from './models/mysubscriptions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity, SubscriptionsEntity, ZonesEntity, DeliverySlotsEntity, MySubscriptionsEntity]),
    UsersModule,
    ItemsModule
  ],
  providers: [OrdersService, OrdersEntity, SubscriptionsEntity, SubscriptionsService, ZonesService],
  controllers: [OrdersController, SubscriptionsController, ZonesController],
})
export class OrdersModule {}
