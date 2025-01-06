import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import HistoryPublicService from '@services/History/public';
import { ProductI } from '@interfaces/Product';
import { EventPublicService } from '@services/Event/public';
import ProductPublicService from '@services/Product/public';

/**
 * @description set product to history and send product preview to client
 */
@Injectable()
export default class ProductHistoryInterceptor implements NestInterceptor {
    constructor(
        private readonly historyService: HistoryPublicService,
        private readonly productPublicService: ProductPublicService,
        private readonly eventPublicService: EventPublicService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async ({ id }: ProductI) => {
                const {
                    session: { ip },
                    sessionID,
                } = context.switchToHttp().getRequest() as Request;

                if (!ip) return;

                this.historyService.addHistoryItem(id, sessionID);

                const productPreview = await this.productPublicService.getProductPreview(id, 'ru');

                this.eventPublicService.pushToProductHistory(productPreview);
            }),
        );
    }
}
