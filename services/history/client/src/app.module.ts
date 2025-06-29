import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryModule } from './history/history.module';
import ConfigModule from '@common/config/config.module';
import ConfigService from '@common/config/config.service';
import AppController from './app.controller';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => conf.getDBConnectionData(),
            name: 'default',
        }),
        HistoryModule,
    ],
    controllers: [AppController],
})
export class AppModule { }
