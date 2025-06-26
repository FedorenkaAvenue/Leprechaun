import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * @description get session cookie and set it to req body
 */
export class SessionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.session) req.session = req.cookies.session;

        next();
    }
}
