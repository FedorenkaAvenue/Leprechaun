import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { from, Observable, of, switchMap } from "rxjs";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { HistoryPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/history";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import HistoryEntity from "./history.entity";
import ProductService from "@common/product/product.service";
import HistoryMapper from "./history.mapper";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(HistoryEntity) private readonly historyRepo: Repository<HistoryEntity>,
        private readonly productService: ProductService,
    ) { }

    public getHistoryListPublic(user: User['id'], queries: QueryCommonParams): Observable<HistoryPublic[]> {
        return from(this.historyRepo.findBy({ user, })).pipe(
            switchMap(history => {
                if (!history.length) return of([]);

                return this.productService.getProductListByIdsPublic(history.map(h => h.product), queries).pipe(
                    switchMap(products => of(history.map(h => HistoryMapper.toViewPublic(h, products))))
                )
            })
        )
    }

    public clearHistory(user: User['id']): Observable<void> {
        return from(this.historyRepo.delete({ user, })).pipe(
            switchMap(() => of(void 0))
        )
    }

    public addHistoryItem(user: User['id'], product: Product['id']): Observable<void> {
        return from(this.historyRepo.upsert({ user, product }, ['user', 'product'])).pipe(
            switchMap(() => of(void 0))
        )
    }

    /**
     * @description for 'product.deleted' event. remove all history by product ID
     * @param product product ID
     */
    public removeHistoriesByProductId(product: Product['id']): Promise<DeleteResult> {
        return this.historyRepo.delete({ product });
    }
}
