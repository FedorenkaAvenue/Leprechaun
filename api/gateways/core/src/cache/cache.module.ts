import { CacheModule as CacheNestModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import CacheService from './cache.service';
import ConfigService from '../config/config.service';
import ConfigModule from '../config/config.module';
import LoggerModule from '@shared/modules/logger/logger.module';

@Module({
    imports: [
        CacheNestModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (conf: ConfigService) => conf.getCacheStoreConfig(),
        }),
        LoggerModule,
    ],
    providers: [CacheService],
    exports: [CacheService, CacheNestModule],
})
export default class CacheModule { }
