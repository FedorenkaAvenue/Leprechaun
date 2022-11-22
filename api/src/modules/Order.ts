import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import OrderService from '@services/Order';
import OrderPublicController from '@controllers/Order/public';
import OrderPrivateController from '@controllers/Order/private';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
    controllers: [OrderPublicController, OrderPrivateController],
    providers: [OrderService],
    exports: [OrderService],
})
export default class OrderModule {}
