import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import LoggerService from '@services/Logger';

@Injectable()
export default class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly loggerService: LoggerService,
    ) {}

    public async resetCache() {
        await this.cacheManager.reset();
        this.loggerService.info('cache has been reseted');
    }
}
