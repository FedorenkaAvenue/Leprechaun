import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import HistoryPublicService from '@services/History/public';
import { EventPublicService } from '@services/Event/public';
import { ProductPublic } from '@dto/Product/public';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { LabelI } from '@interfaces/Label';
import { PriceEntity } from '@entities/_Price';
import { ProductStatusE } from '@enums/Product';

class ProductpublicPreviewFromProductPublic implements ProductPreviewPublicI {
    id: string;
    title: string;
    labels: LabelI[];
    status: ProductStatusE;
    price: PriceEntity;
    image: string;

    constructor({ id, title, labels, status, price, images }: ProductPublic) {
        this.id = id;
        this.title = title;
        this.labels = labels;
        this.status = status;
        this.image = images.find(({ is_main }) => is_main).src;
        this.price = price;
    }
}

/**
 * @description set product to history and send product preview to client
 */
@Injectable()
export default class ProductHistoryInterceptor implements NestInterceptor {
    constructor(
        private readonly historyService: HistoryPublicService,
        private readonly eventPublicService: EventPublicService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (product: ProductPublic) => {
                const { session: { ip }, sessionID } = context.switchToHttp().getRequest() as Request;

                if (!ip) return;

                this.historyService.addHistoryItem(product.id, sessionID);
                this.eventPublicService.pushToProductHistory(
                    sessionID,
                    new ProductpublicPreviewFromProductPublic(product),
                );
            }),
        );
    }
}
