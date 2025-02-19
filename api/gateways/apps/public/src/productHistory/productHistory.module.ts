import { Module } from '@nestjs/common';

import ProductHistoryController from './productHistory.controller';
import ProductHistoryService from './productHistory.service';
import ConfigModule from '@core/config/config.module';

import ProductHistoryCoreModule from '@core/productHistory/productHistory.module';

@Module({
    imports: [ProductHistoryCoreModule, ConfigModule],
    controllers: [ProductHistoryController],
    providers: [ProductHistoryService],
    exports: [ProductHistoryService],
})
export default class ProductHistoryModule { }
