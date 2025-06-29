import { Module } from '@nestjs/common';

import OrderPublicController from './order.controller';
import OrderModule from '@common/order/order.module';
import UserModule from '@common/user/user.module';

@Module({
    imports: [
        OrderModule,
        UserModule,
    ],
    controllers: [OrderPublicController],
})
export default class OrderPublicModule { }
