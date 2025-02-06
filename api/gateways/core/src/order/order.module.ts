import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import OrderEntity from "./order.entity";
import OrderService from "./order.service";
import SessionModule from "../session/session.module";
import OrderItemModule from "../orderItem/orderItem.module";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), SessionModule, OrderItemModule],
    providers: [OrderService],
    exports: [TypeOrmModule, OrderService],
})
export default class OrderModule { }
