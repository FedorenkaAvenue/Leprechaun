import ConfigService from '@modules/config/config.service';
import {
    QueryCommonParams, QueryPaginationParams, QueryPriceParams,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { TransData } from '@fedorenkaavenue/leprechaun_lib_entities/server/trans';

const LANGS = new ConfigService().getVal<(keyof TransData)[]>('LANGS');

export class QueriesCommon implements QueryCommonParams {
    lang: keyof TransData;

    constructor({ lang }: QueriesCommon) {
        this.lang = LANGS.includes(lang) ? lang : LANGS[0];
    }
}

export class QueriesPagination implements QueryPaginationParams {
    page: number;
    portion: number;

    constructor({ page, portion, ...rest }: QueriesPagination) {
        this.page = Number(page) || 1;
        this.portion = Number(portion) || 10;
    }
}

/**
 * @description create range object for filters
 * @param min
 * @param max (optional)
 */
export class RangeQuery implements QueryPriceParams {
    min: number;
    max: number;

    constructor(priceQuery: string) {
        const [min = 0, max] = priceQuery.split('-');

        this.min = Number(min);
        this.max = max ? Number(max) : 1000000;
    }
}
