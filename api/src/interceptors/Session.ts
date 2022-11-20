import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import { ProductI } from '@interfaces/Product';
import configService from '@services/Config';

const USER_HISTORY_LENGTH = configService.getVal('USER_HISTORY_LENGTH');

/**
 * @description set user product history to session
 */
@Injectable()
export class SessionProductHistoryInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(({ id }: ProductI) => {
                const req = context.switchToHttp().getRequest() as Request;

                // req.session.productHistory = [
                //     ...new Set([id, ...req.session.productHistory].slice(0, Number(USER_HISTORY_LENGTH))),
                // ];
            }),
        );
    }
}
