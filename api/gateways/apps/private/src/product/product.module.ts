import { Module } from '@nestjs/common';

import ProductService from './product.service';
import ProductController from './product.controller';
import ProductCoreModule from '@core/product/product.module';
import ImageCoreModule from '@core/image/image.module';
import FSModule from '@core/FS/FS.module';
import AuthModule from '@core/auth/auth.module';
import CacheModule from '@core/cache/cache.module';

@Module({
    imports: [ProductCoreModule, ImageCoreModule, FSModule, AuthModule, CacheModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export default class ProductModule { }
