import { Module } from '@nestjs/common';

import CategoryService from './category.service';
import CategoryController from './category.controller';
import CategoryCoreModule from '@core/category/category.module';
import CacheModule from '@core/cache/cache.module';

@Module({
    imports: [CategoryCoreModule, CacheModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export default class CategoryModule { }
