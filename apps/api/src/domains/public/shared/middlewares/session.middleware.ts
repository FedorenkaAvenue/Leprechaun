import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * @description get session cookie and set it to req body as user Id
 */
export class SessionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.session) req.userId = req.cookies.session;

        next();
    }
}
