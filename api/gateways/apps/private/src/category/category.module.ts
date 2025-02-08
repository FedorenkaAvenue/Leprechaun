import { Module } from '@nestjs/common';

import CategoryController from './category.controller';
import CategoryService from './category.service';
import CategoryCoreModule from '@core/category/category.module';
import FSModule from '@core/FS/FS.module';
import AuthCoreModule from '@core/auth/auth.module';

@Module({
    imports: [CategoryCoreModule, FSModule, AuthCoreModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export default class CategoryModule { }
