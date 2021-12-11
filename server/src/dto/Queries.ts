import { DinamicQueryFilters, IPriceSearchQuery, ISearchQueries, ISearchReqQueries } from '@interfaces/Queries';
import { ProductStatus } from '@interfaces/Product';
import { availableEnum } from '@utils/enum';

/**
 * @description create range object for filters
 * @param min
 * @param max (optional)
 */
export class RangeQueryDTO implements IPriceSearchQuery {
    min: number;
    max: number;

    constructor(priceQuery: string) {
        const [ min = 0, max ] = priceQuery.split('-');

        this.min = Number(max);
        this.max = min ? Number(max) : 1000000;
    }
}

/**
 * @description rebuild url queries to object
 * @param page page number
 * @param price price range filter
 * @param sell item is selling
 * @param restQueries dinamic filters
 */
export class SearchQueriesDTO implements ISearchQueries {
    page: number
    price: IPriceSearchQuery
    status: ProductStatus;
    dinamicFilters: DinamicQueryFilters;

    constructor({ page, price, status, ...restQueries }: ISearchReqQueries) {
        this.page = Number(page) || 1;
        this.price = price ? new RangeQueryDTO(price) : null;
        this.status = availableEnum(status, ProductStatus) ? status : ProductStatus.AVAILABLE;
        this.dinamicFilters = Object.keys(restQueries).length ? restQueries : null;
    }
}

export class QueryGETListDTO {
    queryList: Array<string>;

    constructor(array: string) {
        this.queryList = typeof array === 'string' ? array.split(';') : [];
    }
}
