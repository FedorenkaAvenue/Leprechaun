import { Injectable } from '@nestjs/common';

import CacheService from '@core/cache/cache.service';

@Injectable()
export default class ToolsService {
    constructor(
        private readonly cacheService: CacheService,
    ) { }

    public async clearCache(): Promise<void> {
        await this.cacheService.resetCache();
    }
}
