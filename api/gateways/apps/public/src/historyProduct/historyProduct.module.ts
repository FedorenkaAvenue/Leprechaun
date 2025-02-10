import { Module } from '@nestjs/common';

import HistoryProductController from './historyProduct.controller';
import HistoryProductService from './historyProduct.service';
import ConfigModule from '@core/config/config.module';

import HistoryProductCoreModule from '@core/historyProduct/historyProduct.module';

@Module({
    imports: [HistoryProductCoreModule, ConfigModule],
    controllers: [HistoryProductController],
    providers: [HistoryProductService],
    exports: [HistoryProductService],
})
export default class HistoryProductModule { }
