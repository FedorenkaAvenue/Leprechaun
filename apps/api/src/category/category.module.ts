import { Module } from '@nestjs/common';

import CategoryController from './category.controller';
import CategoryService from './category.service';
import CategoryCoreModule from '@core/category/category.module';
import FSModule from '@core/FS/FS.module';
import AuthCoreModule from '@core/auth/auth.module';
import CacheModule from '@core/cache/cache.module';

@Module({
    imports: [CategoryCoreModule, FSModule, AuthCoreModule, CacheModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export default class CategoryModule { }
