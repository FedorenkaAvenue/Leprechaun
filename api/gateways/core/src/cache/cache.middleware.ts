import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import CacheService from './cache.service';

/**
 * @description reset cache
 */
@Injectable()
export class CacheResetMiddleware implements NestMiddleware {
    constructor(private readonly cacheService: CacheService) { }

    use(req: Request, res: Response, next: NextFunction) {
        this.cacheService.resetCache();
        next();
    }
}
