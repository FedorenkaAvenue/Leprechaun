import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import { ProductPublic, ProductpublicPreviewFromProductPublic } from '../product/product.dto';
import HistoryProductService from '../historyProduct/historyProduct.service';
import EventService from '../event/event.service';

/**
 * @description set product to history and send product preview to client
 */
@Injectable()
export default class HistoryProductInterceptor implements NestInterceptor {
    constructor(
        private readonly historyService: HistoryProductService,
        private readonly eventService: EventService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (product: ProductPublic) => {
                const { session: { ip }, sessionID } = context.switchToHttp().getRequest() as Request;

                await this.historyService.addHistoryProductItem(product.id, sessionID);
                this.eventService.pushHistoryProduct({
                    userId: sessionID,
                    product: new ProductpublicPreviewFromProductPublic(product)
                });
            }),
        );
    }
}
