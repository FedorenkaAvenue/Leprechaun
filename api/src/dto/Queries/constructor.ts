import {
    DinamicQueryFiltersT,
    QueriesCommonI,
    QueriesProductListI,
    QueriesReqI,
    QueriesWishlistI,
    QueryPriceI,
} from '@interfaces/Queries';
import { SortProductE, SortWishlistE } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatusE } from '@enums/Product';
import configService from '@services/Config';

const [DEFAULT_LANG] = configService.getVal('LANGS');

/**
 * @description create range object for filters
 * @param min
 * @param max (optional)
 */
export class RangeQuery implements QueryPriceI {
    min: number;
    max: number;

    constructor(priceQuery: string) {
        const [min = 0, max] = priceQuery.split('-');

        this.min = Number(max);
        this.max = min ? Number(max) : 1000000;
    }
}

export class QueriesCommon implements QueriesCommonI {
    lang: string;

    constructor({ lang }: QueriesReqI) {
        this.lang = lang || DEFAULT_LANG;
    }
}

export class QueriesProductList extends QueriesCommon implements QueriesProductListI {
    lang: string;
    sort: SortProductE;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatusE;
    dinamicFilters: DinamicQueryFiltersT;

    constructor({ lang, sort, page, portion, price, status, ...restQueries }: QueriesReqI) {
        super({ lang });
        this.sort = Number(sort) || SortProductE.POPULAR;
        this.page = Number(page) || 1;
        this.portion = Number(portion) || 10;
        this.price = price ? new RangeQuery(price) : null;
        this.status = availableEnum(status, ProductStatusE) ? status : ProductStatusE.AVAILABLE;
        this.dinamicFilters = Object.keys(restQueries).length ? restQueries : null;
    }
}

export class QueriesWishlist extends QueriesCommon implements QueriesWishlistI {
    lang: string;
    sort: SortWishlistE;

    constructor({ lang, sort }: QueriesReqI) {
        super({ lang });
        this.sort = Number(sort) || SortWishlistE.LASTEST;
    }
}
