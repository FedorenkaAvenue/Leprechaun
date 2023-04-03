import { Module, CacheModule as CacheNestModule, Global } from '@nestjs/common';

import CacheService from '@services/Cache';
import ConfigService from '@services/Config';

@Global()
@Module({
    imports: [
        CacheNestModule.registerAsync({
            useFactory: async (conf: ConfigService) => !conf.isDev && conf.getCacheStoreConfig(),
            inject: [ConfigService]
        }),
    ],
    providers: [CacheService],
    exports: [CacheService, CacheNestModule],
})
export default class CacheModule {}
