import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

// import { ProductLabelI, ProductPreviewPublicI } from './product.interface';
import { ProductPublic } from './product.dto';
import HistoryProductService from '../historyProduct/historyProduct.service';
// import { ProductStatus } from '@core/product/product.enum';
// import { PriceEntity } from '@core/product/product.entity';

// class ProductpublicPreviewFromProductPublic implements ProductPreviewPublicI {
//     id: string;
//     title: string;
//     labels: ProductLabelI[];
//     status: ProductStatus;
//     price: PriceEntity;
//     image: string;

//     constructor({ id, title, labels, status, price, images }: ProductPublic) {
//         this.id = id;
//         this.title = title;
//         this.labels = labels;
//         this.status = status;
//         this.image = images.find(({ is_main }) => is_main)?.src as string;
//         this.price = price;
//     }
// }

/**
 * @description set product to history and send product preview to client
 */
@Injectable()
export default class HistoryProductInterceptor implements NestInterceptor {
    constructor(
        private readonly historyService: HistoryProductService,
        // private readonly eventPublicService: EventService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async (product: ProductPublic) => {
                //@ts-ignore
                const { session: { ip }, sessionID } = context.switchToHttp().getRequest() as Request;

                if (!ip) return;

                this.historyService.addHistoryProductItem(product.id, sessionID);
                // this.eventPublicService.pushToProductHistory(
                //     sessionID,
                //     new ProductpublicPreviewFromProductPublic(product),
                // );
            }),
        );
    }
}
