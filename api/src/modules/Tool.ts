import { Global, Module, CacheModule as CacheNestModule } from '@nestjs/common';

import ConfigService from '@services/Config';
import MailService from '@services/Mail';
import { FSService } from '@services/FS';
import CacheService from '@services/Cache';

//TODO: remove global
@Global()
@Module({
    imports: [
        CacheNestModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getCacheStoreConfig(),
        })
    ],
    providers: [ ConfigService, MailService, FSService, CacheService ],
    exports: [ ConfigService, MailService, FSService, CacheNestModule ]
})
export default class ToolModule {}
