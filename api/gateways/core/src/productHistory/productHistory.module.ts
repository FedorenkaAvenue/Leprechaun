import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProductHistoryEntity from "./productHistory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductHistoryEntity])],
    exports: [TypeOrmModule],
})
export default class ProductHistoryModule { }
