import { BadRequestException } from '@nestjs/common';

import {
    QueriesCommonI, QueriesPaginationI, QueriesProductListI, QueriesSearchI, QueryOptionsFiltersT, QueryPriceI,
} from '@interfaces/Queries';
import { ProductSort } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatus } from '@enums/Product';
import { singleConfigService } from '@services/Config';
import { CategoryI } from '@interfaces/Category';
import { LanguagesI } from '@interfaces/Trans';

const LANGS = singleConfigService.getVal('LANGS') as (keyof LanguagesI)[];

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
    lang: keyof LanguagesI;

    constructor({ lang }: QueriesCommonI) {
        this.lang = LANGS.includes(lang) ? lang : LANGS[0];
    }
}

class QueriesPagination extends QueriesCommon implements QueriesPaginationI {
    page: number;
    portion: number;

    constructor({ page, portion, ...rest }: QueriesPaginationI) {
        super(rest);
        this.page = Number(page) || 1;
        this.portion = Number(portion) || 10;
    }
}

export class QueriesProductList extends QueriesPagination implements QueriesProductListI {
    sort: ProductSort;
    category: CategoryI['url'];
    status: ProductStatus | null;
    price: QueryPriceI;
    optionsFilter: QueryOptionsFiltersT | null;

    constructor({ category, lang, sort, page, portion, status, price, ...restQueries }: QueriesProductListI<string>) {
        super({ lang, page, portion });
        this.sort = Number(sort) || ProductSort.POPULAR;
        this.status = availableEnum(status, ProductStatus) ? status : null;
        this.category = category;
        this.price ? new RangeQuery(price) : null;
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

    constructor({ substring, ...restQueries }: QueriesSearchI) {
        if (!substring) throw new BadRequestException('substring is empty');

        super(restQueries);
        this.substring = substring;
    }
}
