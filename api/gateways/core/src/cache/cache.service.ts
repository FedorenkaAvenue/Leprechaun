import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import LoggerService from '@shared/modules/logger/logger.service';

@Injectable()
export default class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly loggerService: LoggerService,
    ) { }

    public async resetCache() {
        await this.cacheManager.reset();
        this.loggerService.info('cache has been reseted');
    }
}
