import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import CacheService from '@services/Cache';

/**
 * @description reset cache
 */
@Injectable()
export default class CacheReset implements NestMiddleware {
    constructor(private readonly cahceService: CacheService) {}

    use(req: Request, res: Response, next: NextFunction) {
        this.cahceService.resetCache();
        next();
    }
}
