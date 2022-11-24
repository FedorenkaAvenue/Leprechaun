import { Injectable } from '@nestjs/common';

import CacheService from '../Cache';

@Injectable()
export default class AdminService {
    constructor(private readonly cacheService: CacheService) {}

    async clearCache(): Promise<void> {
        await this.cacheService.resetCache();
    }
}
