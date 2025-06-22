import { Module } from "@nestjs/common";

import { HistoryService } from "./history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import HistoryEntity from "./history.entity";
import ProductModule from "@common/product/product.module";
import HistoryController from "./history.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([HistoryEntity]),
        ProductModule,
    ],
    controllers: [HistoryController],
    providers: [HistoryService],
})
export class HistoryModule { }
