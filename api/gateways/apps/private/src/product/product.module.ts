import { Module } from '@nestjs/common';

import ProductService from './product.service';
import ProductController from './product.controller';
import ProductCoreModule from '@core/product/product.module';
import ProductImageModule from '@core/productImage/productImage.module';
import AuthModule from '@core/auth/auth.module';
import CacheModule from '@core/cache/cache.module';

@Module({
    imports: [ProductCoreModule, ProductImageModule, AuthModule, CacheModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export default class ProductModule { }
