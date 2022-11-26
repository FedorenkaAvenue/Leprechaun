import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import CacheService from '@services/Cache';

/**
 * @description reset cache
 */
@Injectable()
export default class CacheResetMiddleware implements NestMiddleware {
    constructor(private readonly cacheService: CacheService) {}

    use(req: Request, res: Response, next: NextFunction) {
        this.cacheService.resetCache();
        next();
    }
}
