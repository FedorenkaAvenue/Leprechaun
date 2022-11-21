import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import { ProductI } from '@interfaces/Product';
import HistoryPublicService from '@services/History/public';

/**
 * @description set product to history
 */
@Injectable()
export class SessionProductHistoryInterceptor implements NestInterceptor {
    constructor(private readonly historyService: HistoryPublicService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(({ id }: ProductI) => {
                const req = context.switchToHttp().getRequest() as Request;

                this.historyService.addHistoryItem(id, req.session.id);
            }),
        );
    }
}
