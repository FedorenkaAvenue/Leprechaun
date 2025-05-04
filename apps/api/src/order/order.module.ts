import { Module } from '@nestjs/common';

import OrderService from './order.service';
import OrderController from './order.controller';
import OrderCoreModule from '@core/order/order.module';
import AuthModule from '@core/auth/auth.module';

@Module({
    imports: [OrderCoreModule, AuthModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export default class OrderModule { }
