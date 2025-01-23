import { CallHandler, ExecutionContext, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';

import SessionData from "@dto/SessionData";

/**
 * @description init session to session store. if exists - update lifecycle
 */
export default class SessionInitInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest() as Request;

        // create new session
        if (!req.session.ip) {
            const { ip, session } = req;

            req.session = Object.assign(session, new SessionData({ ip }));

            try {
                await new Promise<void>((resolve, reject) => {
                    req.session.save((err) => err ? reject(err) : resolve());
                });
            } catch (err) {
                throw new InternalServerErrorException('Failed to save session :', String(err));
            }
        } else {
            req.session.touch();
        }

        return next.handle();
    }
}
