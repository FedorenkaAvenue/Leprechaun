import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HistoryProductEntity } from "./historyProduct.entity";

@Module({
    imports: [TypeOrmModule.forFeature([HistoryProductEntity])],
    exports: [TypeOrmModule],
})
export default class HistoryProductModule { }
