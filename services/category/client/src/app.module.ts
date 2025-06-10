import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        CategoryModule,
    ],
})
export class AppModule { }
