import { Injectable } from '@nestjs/common';

import CacheService from '../Cache';

@Injectable()
export default class AdminService {
    constructor(
        private readonly cacheService: CacheService
    ) {}

    clearCache() {
        this.cacheService.resetCache();
    }
}
