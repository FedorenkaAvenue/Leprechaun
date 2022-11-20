import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import OrderService from '@services/Order';
import OrderPublicController from '@controllers/Order/public';
import OrderAdminController from '@controllers/Order/admin';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
    controllers: [OrderPublicController, OrderAdminController],
    providers: [OrderService],
    exports: [OrderService],
})
export default class OrderModule {}
