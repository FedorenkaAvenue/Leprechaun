import { Global, Module, CacheModule as CacheNestModule } from '@nestjs/common';

import configService from '@services/Config';
import MailService from '@services/Mail';
import { FSService } from '@services/FS';
import CacheService from '@services/Cache';

//TODO: remove global
@Global()
@Module({
    imports: [
        CacheNestModule.registerAsync({
            useFactory: async () => configService.getCacheStoreConfig(),
        }),
    ],
    providers: [MailService, FSService, CacheService],
    exports: [MailService, FSService, CacheNestModule],
})
export default class ToolModule {}
