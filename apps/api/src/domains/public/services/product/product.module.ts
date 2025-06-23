import { Module } from '@nestjs/common';

import ProductPublicController from './product.controller';
import ProductModule from '@common/product/product.module';

@Module({
    imports: [ProductModule],
    controllers: [ProductPublicController],
})
export default class ProductPublicModule { }
