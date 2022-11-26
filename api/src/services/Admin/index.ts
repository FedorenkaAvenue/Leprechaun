import { Injectable } from '@nestjs/common';

import CacheService from '../Cache';

@Injectable()
export default class AdminService {
    constructor(protected readonly cacheService: CacheService) {}
}
