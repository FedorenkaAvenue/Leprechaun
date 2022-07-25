import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export default class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async resetCache() {
        await this.cacheManager.reset();
        console.log('cache reseted');
    }
}
