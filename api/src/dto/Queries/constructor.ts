import { SearchReqQueriesI } from '@interfaces/Queries';
import { SortType } from '@enums/Query';
import { availableEnum } from '@utils/enum';
import { ProductStatus } from '@enums/Product';
import { QueryGETListDTO, RangeQueryDTO, SearchQueriesDTO } from '.';

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
 * @param price price range filter
 * @param sell item is selling
 * @param restQueries dinamic filters
 */
export class SearchQueries extends SearchQueriesDTO {
    constructor({ sort, page, price, status, ...restQueries }: SearchReqQueriesI) {
        super();
        this.sort = Number(sort) || SortType.POPULAR;
        this.page = Number(page) || 1;
        this.price = price ? new RangeQuery(price) : null;
        this.status = availableEnum(status, ProductStatus) ? status : ProductStatus.AVAILABLE;
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
