import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProductModule from './product/product.module';
import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';
import ProductImageModule from './productImage/productImage.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        ProductModule,
        ProductImageModule,
    ],
})
export class AppModule { }
