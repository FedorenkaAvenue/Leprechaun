import { Module } from "@nestjs/common";

import OrderItemCoreModule from '@core/orderItem/orderItem.module';

@Module({
    imports: [OrderItemCoreModule],
    exports: [OrderItemCoreModule],
})
export default class OrderItemModule { }
