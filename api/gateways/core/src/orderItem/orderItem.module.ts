import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderItemEntity } from "./orderItem.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderItemEntity])],
    exports: [TypeOrmModule],
})
export default class OrderItemModule { }
