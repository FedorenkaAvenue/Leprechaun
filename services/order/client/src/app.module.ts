import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrderModule from './order/order.module';
import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';
import OrderItemModule from './orderItem/orderItem.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        OrderModule,
        OrderItemModule,
    ],
})
export class AppModule { }
