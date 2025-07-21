import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HistoryService } from "./history.service";
import HistoryEntity from "./history.entity";
import ProductModule from "@common/product/product.module";
import HistoryListener from "./history.listener";

@Module({
    imports: [
        TypeOrmModule.forFeature([HistoryEntity]),
        ProductModule,
    ],
    controllers: [HistoryListener],
    providers: [HistoryService],
    exports: [HistoryService],
})
export class HistoryModule { }
