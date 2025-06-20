import { Module } from '@nestjs/common';

import OrderPublicController from './order.controller';

@Module({
    controllers: [OrderPublicController],
})
export default class OrderPublicModule { }
