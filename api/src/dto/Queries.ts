import { BadRequestException } from '@nestjs/common';

import {
    QueriesCommonI, QueriesProductListI, QueriesSearchI, QueryOptionsFiltersT, QueryPriceI,
} from '@interfaces/Queries';
import { ProductSort } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatusE } from '@enums/Product';
import { singleConfigService } from '@services/Config';

const LANGS = singleConfigService.getVal('LANGS');

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
    page: number;
    lang: string;
    price: QueryPriceI;
    portion: number;

    constructor({ lang, page, price, portion }: QueriesCommonI<string>) {
        this.lang = LANGS.includes(lang) ? lang : LANGS[0];
        this.page = Number(page) || 1;
        this.price ? new RangeQuery(price) : null;
        this.portion = Number(portion) || 10;
    }
}

export class QueriesProductList extends QueriesCommon implements QueriesProductListI {
    sort: ProductSort;
    status: ProductStatusE;
    optionsFilter: QueryOptionsFiltersT;

    constructor({ lang, sort, page, portion, price, status, ...restQueries }: QueriesProductListI<string>) {
        super({ lang, page, price, portion });
        this.sort = Number(sort) || ProductSort.POPULAR;
        this.status = availableEnum(status, ProductStatusE) ? status : ProductStatusE.AVAILABLE;
        this.optionsFilter = Object.keys(restQueries).length
            ? Object
                //@ts-ignore
                .entries<string>(restQueries)
                .reduce((acc, [k, v]) => ({ ...acc, [k]: v.split(',') }), {})
            : null;
    }
}

export class QueriesSearch extends QueriesCommon implements QueriesSearchI {
    substring: string;
    price: QueryPriceI;

    constructor({ substring, ...restQueries }: QueriesSearchI<string>) {
        if (!substring) throw new BadRequestException('substring is empty');

        super(restQueries);
        this.substring = substring;
    }
}
