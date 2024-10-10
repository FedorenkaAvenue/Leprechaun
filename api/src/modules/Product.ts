import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductPublicController from '@controllers/Product/public';
import ProductPrivateController from '@controllers/Product/private';
import { ProductEntity } from '@entities/Product';
import ProductPublicService from '@services/Product/public';
import ProductPrivateService from '@services/Product/private';
import ImageModule from '@modules/Image';
import HistoryModule from './History';
import ProductService from '@services/Product';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ImageModule, HistoryModule],
    controllers: [ProductPublicController, ProductPrivateController],
    providers: [ProductPublicService, ProductPrivateService, ProductService],
    exports: [ProductPublicService, ProductPrivateService, ProductService],
})
export default class ProductModule {}
