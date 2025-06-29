import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import OrderEntity from "./order.entity";
import OrderService from "./order.service";
import ProductModule from "@common/product/product.module";
import OrderListener from "./order.listener";
import OrderItemController from "./order.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity]),
        ProductModule,
    ],
    controllers: [OrderItemController, OrderListener],
    providers: [OrderService],
    exports: [OrderService],
})
export default class OrderModule { }
