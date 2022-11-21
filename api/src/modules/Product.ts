import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductPublicController from '@controllers/Product/public';
import ProductAdminController from '@controllers/Product/admin';
import { ProductEntity } from '@entities/Product';
import ProductService from '@services/Product';
import { FSService } from '@services/FS';
import ImageModule from '@modules/Image';
import HistoryModule from './History';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        MulterModule.registerAsync({ useClass: FSService }),
        ImageModule,
        HistoryModule,
    ],
    controllers: [ProductPublicController, ProductAdminController],
    providers: [ProductService, FSService],
    exports: [ProductService],
})
export default class ProductModule {}
