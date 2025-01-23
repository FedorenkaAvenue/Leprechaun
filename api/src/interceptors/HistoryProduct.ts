import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

import { EventPublicService } from '@services/Event/public';
import { ProductPublic } from '@dto/Product/public';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { LabelI } from '@interfaces/Label';
import { PriceEntity } from '@entities/_Price';
import { ProductStatus } from '@enums/Product';
import HistoryProductPublicService from '@services/HistoryProduct/public';

class ProductpublicPreviewFromProductPublic implements ProductPreviewPublicI {
    id: string;
    title: string;
    labels: LabelI[];
    status: ProductStatus;
    price: PriceEntity;
    image: string;

    constructor({ id, title, labels, status, price, images }: ProductPublic) {
        this.id = id;
        this.title = title;
        this.labels = labels;
        this.status = status;
        this.image = images.find(({ is_main }) => is_main)?.src as string;
        this.price = price;
    }
}

/**
 * @description set product to history and send product preview to client
 */
@Injectable()
export default class HistoryProductInterceptor implements NestInterceptor {
    constructor(
        private readonly historyService: HistoryProductPublicService,
        private readonly eventPublicService: EventPublicService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (product: ProductPublic) => {
                const { session: { ip }, sessionID } = context.switchToHttp().getRequest() as Request;

                if (!ip) return;

                this.historyService.addHistoryProductItem(product.id, sessionID);
                this.eventPublicService.pushToProductHistory(
                    sessionID,
                    new ProductpublicPreviewFromProductPublic(product),
                );
            }),
        );
    }
}
