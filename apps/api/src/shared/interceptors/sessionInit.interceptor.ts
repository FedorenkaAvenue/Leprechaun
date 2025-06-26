import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { Request, Response } from 'express';

import UserService from '@common/user/user.service';

/**
 * @description init session if doesn't exist
 */
@Injectable()
export default class SessionInitInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let session = request.session;

        if (session) return next.handle();

        return from(this.userService.createSessionUser()).pipe(
            switchMap(({ id }) => {
                request.session = id;
                response.cookie('session', id, {
                    // httpOnly: true,
                    // secure: true,
                    // sameSite: 'lax',
                    // path: '/',
                });

                return next.handle();
            }),
        );
    }
}
