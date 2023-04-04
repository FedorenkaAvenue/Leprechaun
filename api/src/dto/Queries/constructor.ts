import { BadRequestException } from '@nestjs/common';

import {
    QueryDynamicFiltersT,
    QueriesCommonI,
    QueriesProductListI,
    QueriesReqI,
    QueriesSearchI,
    QueriesWishlistI,
    QueryPriceI,
    QueryCommonFiltersI,
} from '@interfaces/Queries';
import { SortProductE, SortWishlistE } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatusE } from '@enums/Product';
import { singleConfigService } from '@services/Config';

const [DEFAULT_LANG] = singleConfigService.getVal('LANGS');

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

        this.min = Number(min);
        this.max = max ? Number(max) : 1000000;
    }
}

export class QueriesCommon implements QueriesCommonI {
    lang: string;

    constructor({ lang }: QueriesReqI) {
        this.lang = lang || DEFAULT_LANG;
    }
}

export class QueriesProductList extends QueriesCommon implements QueriesProductListI {
    sort: SortProductE;
    page: number;
    portion: number;
    commonFilters: QueryCommonFiltersI;
    dynamicFilters: QueryDynamicFiltersT;

    constructor({ lang, sort, page, portion, price, status, substring, ...restQueries }: QueriesReqI) {
        super({ lang });
        this.sort = Number(sort) || SortProductE.POPULAR;
        this.page = Number(page) || 1;
        this.portion = Number(portion) || 10;
        this.commonFilters = {
            price: price ? new RangeQuery(price) : null,
            status: status = availableEnum(status, ProductStatusE) ? status : ProductStatusE.AVAILABLE,
        };
        this.dynamicFilters = Object.keys(restQueries).length
            ? Object
                .entries<string>(restQueries)
                .reduce((acc, [k, v]) => ({ ...acc, [k]: v.split(',') }), {})
            : null;
    }
}

export class QueriesWishlist extends QueriesCommon implements QueriesWishlistI {
    sort: SortWishlistE;

    constructor({ lang, sort }: QueriesReqI) {
        super({ lang });
        this.sort = Number(sort) || SortWishlistE.LASTEST;
    }
}

export class QueriesSearch extends QueriesCommon implements QueriesSearchI {
    substring: string;

    constructor({ lang, substring }: QueriesReqI) {
        if (!substring) throw new BadRequestException('substring is empty');

        super({ lang });
        this.substring = substring;
    }
}
