// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Msg91Service } from './users/otp.service';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'promis',
      password: 'promistest',
      database: 'kitchen_holiday',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }), // Change the connection string as per your MongoDB setup
    AuthModule,
    UsersModule,
    ItemsModule,
    OrdersModule
  ],
  providers: [AppService],
})
export class AppModule {}
