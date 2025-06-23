import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import SubsciptionModule from './subscription/subscription.module';
import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        SubsciptionModule,
    ],
})
export class AppModule { }
