import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import HistoryPublicService from '@services/History/public';
import { ProductI } from '@interfaces/Product';

/**
 * @description set product to history
 */
@Injectable()
export default class ProductHistoryInterceptor implements NestInterceptor {
    constructor(private readonly historyService: HistoryPublicService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(({ id }: ProductI) => {
                const {
                    session: { ip },
                    sessionID,
                } = context.switchToHttp().getRequest() as Request;

                if (!ip) return;

                this.historyService.addHistoryItem(id, sessionID);
            }),
        );
    }
}
