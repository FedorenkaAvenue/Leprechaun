import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { Request, Response } from 'express';

import UserService from '@common/user/user.service';

/**
 * @description init session if user credentials dont exist
 */
@Injectable()
export default class SessionInitInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const { userId } = request;

        if (userId) return next.handle();

        return from(this.userService.createSessionUser()).pipe(
            switchMap(({ id }) => {
                request.userId = id;
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
