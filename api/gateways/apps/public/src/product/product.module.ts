import { Module } from '@nestjs/common';

import ProductController from './product.controller';
import ProductService from './product.service';
import EventModule from '../event/event.module';
import HistoryProductModule from '../historyProduct/historyProduct.module';
import ProductCoreModule from '@core/product/product.module';
import CacheModule from '@core/cache/cache.module';

@Module({
    imports: [ProductCoreModule, CacheModule, HistoryProductModule, EventModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export default class ProductModule { }
