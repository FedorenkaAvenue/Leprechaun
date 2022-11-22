import { Module, CacheModule as CacheNestModule, Global } from '@nestjs/common';

import CacheService from '@services/Cache';
import configService from '@services/Config';

@Global()
@Module({
    imports: [
        CacheNestModule.registerAsync({
            useFactory: async () => configService.getCacheStoreConfig(),
        }),
    ],
    providers: [CacheService],
    exports: [CacheService, CacheNestModule],
})
export default class CacheModule {}
