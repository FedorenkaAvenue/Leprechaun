import { DinamicQueryFilters, IPriceSearchQuery, ISearchQeuries, ISearchReqQueries } from '@interfaces/Queries';

/**
 * @description create range object for filters
 * @param min
 * @param max (optional)
 */
export class RangeQueryDTO implements IPriceSearchQuery {
    min: number;
    max: number;

    constructor(priceQuery: string) {
        const [ from = 0, to ] = priceQuery.split('-');

        this.min = Number(from);
        this.max = to ? Number(to) : 1000000;
    }
}

/**
 * @description rebuild url queries to object
 * @param page page number
 * @param price price range filter
 * @param sell item is selling
 * @param restQueries dinamic filters
 */
export class SearchQueriesDTO implements ISearchQeuries {
    page: number
    price: IPriceSearchQuery
    sell: number
    dinamicFilters: DinamicQueryFilters;

    constructor({ page, price, sell, ...restQueries }: ISearchReqQueries) {
        this.page = Number(page) || 1;
        this.price = price ? new RangeQueryDTO(price) : null;
        this.sell = typeof sell === 'string'
            ? isNaN(+sell) ? null: Number(sell)
            : null;
        this.dinamicFilters = Object.keys(restQueries).length ? restQueries : null;
    }
}
