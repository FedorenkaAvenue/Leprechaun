import { QueriesReqI } from '@interfaces/Queries';
import { SortTypeE } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatusE } from '@enums/Product';
import { QueryGETListDTO, RangeQueryDTO, QueriesDTO } from '.';

/**
 * @description create range object for filters
 * @param min
 * @param max (optional)
 */
export class RangeQuery extends RangeQueryDTO {
    constructor(priceQuery: string) {
        const [min = 0, max] = priceQuery.split('-');

        super();
        this.min = Number(max);
        this.max = min ? Number(max) : 1000000;
    }
}

/**
 * @description rebuild url queries to object
 * @param sort sort type
 * @param page page number
 * @param portion amount of items by one portion
 * @param price price range filter
 * @param sell item is selling
 * @param restQueries dinamic filters
 */
export class Queries extends QueriesDTO {
    constructor({ sort, page, price, status, portion, ...restQueries }: QueriesReqI) {
        super();
        this.sort = Number(sort) || SortTypeE.POPULAR;
        this.page = Number(page) || 1;
        this.portion = Number(portion) || 10;
        this.price = price ? new RangeQuery(price) : null;
        this.status = availableEnum(status, ProductStatusE) ? status : ProductStatusE.AVAILABLE;
        this.dinamicFilters = Object.keys(restQueries).length ? restQueries : null;
    }
}

/**
 * @description parse query array (string, separated by semi-colons)
 */
export class QueryGETList extends QueryGETListDTO {
    constructor(array: string | undefined) {
        super();
        this.queryList = array ? array.split(';') : null;
    }
}
