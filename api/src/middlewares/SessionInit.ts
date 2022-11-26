import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import SessionData from '@dto/SessionData/constructor';

/**
 * @description init and update new session
 */
@Injectable()
export default class SesssionInitMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // create new session
        if (!req.session.ip) {
            const { ip, session } = req;

            req.session = Object.assign(session, new SessionData({ ip }));
        }

        next();
    }
}
