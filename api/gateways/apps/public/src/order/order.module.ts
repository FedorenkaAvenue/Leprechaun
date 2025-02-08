import { Module } from '@nestjs/common';

import OrderService from './order.service';
import OrderController from './order.controller';
import OrderItemModule from '../orderItem/orderItem.module';
import OrderCoreModule from '@core/order/order.module';

@Module({
    imports: [OrderCoreModule, OrderItemModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export default class OrderModule { }
