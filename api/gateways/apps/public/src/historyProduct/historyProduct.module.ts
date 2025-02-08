import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import HistoryProductController from './historyProduct.controller';
import HistoryProductService from './historyProduct.service';
import { HistoryProductEntity } from './historyProduct.entity';
import ConfigModule from '@core/config/config.module';

@Module({
    imports: [TypeOrmModule.forFeature([HistoryProductEntity]), ConfigModule],
    controllers: [HistoryProductController],
    providers: [HistoryProductService],
    exports: [HistoryProductService],
})
export default class HistoryProductModule { }
