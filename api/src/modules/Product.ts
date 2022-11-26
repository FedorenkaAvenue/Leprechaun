import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductPublicController from '@controllers/Product/public';
import ProductPrivateController from '@controllers/Product/private';
import { ProductEntity } from '@entities/Product';
import ProductPublicService from '@services/Product/public';
import ProductPrivateService from '@services/Product/private';
import ImageModule from '@modules/Image';
import HistoryModule from './History';
import FSModule from './FS';
import QueryBuilderService from '@services/QueryBuilder';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ImageModule, HistoryModule, FSModule],
    controllers: [ProductPublicController, ProductPrivateController],
    providers: [ProductPublicService, ProductPrivateService, QueryBuilderService],
    exports: [ProductPublicService, ProductPrivateService],
})
export default class ProductModule {}
