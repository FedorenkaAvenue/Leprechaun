import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { from, Observable, of, switchMap } from "rxjs";

import HistoryEntity from "./history.entity";
import { HistoryPublic } from "gen/history";
import ProductService from "@common/product/product.service";
import { User } from "gen/user";
import { QueryCommonParams } from "gen/common";
import HistoryMapper from "./history.mapper";
import { Product } from "gen/product";

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

    /**
     * @description for 'product.deleted' event. remove all history by product ID
     * @param product product ID
     */
    public removeHistoriesByProductId(product: Product['id']): Promise<DeleteResult> {
        return this.historyRepo.delete({ product });
    }
}
