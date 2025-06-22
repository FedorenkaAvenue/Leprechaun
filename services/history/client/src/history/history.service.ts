import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, of, switchMap } from "rxjs";

import HistoryEntity from "./history.entity";
import { HistoryPublic } from "gen/history";
import ProductService from "@common/product/product.service";
import { User } from "gen/user";
import { QueryCommonParams } from "gen/common";
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
}
