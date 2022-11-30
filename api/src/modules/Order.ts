import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import OrderPublicService from '@services/Order/public';
import OrderPublicController from '@controllers/Order/public';
import OrderPrivateController from '@controllers/Order/private';
import OrderPrivateService from '@services/Order/private';
import ProductModule from './Product';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]), ProductModule],
    controllers: [OrderPublicController, OrderPrivateController],
    providers: [OrderPublicService, OrderPrivateService],
    exports: [OrderPublicService, OrderPrivateService],
})
export default class OrderModule {}
