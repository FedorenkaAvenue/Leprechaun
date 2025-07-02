import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderItemEntity } from "./orderItem.entity";
import OrderItemService from "./orderItem.service";
import OrderModule from "../order/order.module";
import OrderItemListener from "./orderItem.listener";
import OrderItemController from "./orderItem.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderItemEntity]),
        OrderModule,
    ],
    controllers: [OrderItemController, OrderItemListener],
    providers: [OrderItemService],
    exports: [OrderItemService],
})
export default class OrderItemModule { }
