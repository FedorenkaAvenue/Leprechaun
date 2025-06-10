import { Module } from '@nestjs/common';

import CategoryController from './category.controller';
import CategoryModule from '@common/category/category.module';

@Module({
    imports: [CategoryModule],
    controllers: [CategoryController],
})
export default class CategoryPrivateModule { }
