import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import logger from '@services/Logger';

@Injectable()
export default class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async resetCache() {
        await this.cacheManager.reset();
        logger.info('cache has been reseted');
    }
}
