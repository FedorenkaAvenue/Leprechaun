import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductPublicController from '@controllers/Product/public';
import ProductPrivateController from '@controllers/Product/private';
import { ProductEntity, ProductEntitySubscriber } from '@entities/Product';
import ProductPublicService from '@services/Product/public';
import ProductPrivateService from '@services/Product/private';
import ImageModule from '@modules/Image';
import ProductService from '@services/Product';
import EventModule from './Event';
import SubscribeModule from './Subscribe';
import HistoryProductModule from './HistoryProduct';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        ImageModule,
        HistoryProductModule,
        EventModule,
        SubscribeModule,
    ],
    controllers: [ProductPublicController, ProductPrivateController],
    providers: [ProductPublicService, ProductPrivateService, ProductService, ProductEntitySubscriber],
    exports: [ProductPublicService, ProductPrivateService, ProductService],
})
export default class ProductModule { }
