import { IPriceSearchQuery, ISearchQeuries, ISearchReqQueries } from "@interface/Queries";

/**
 * @description create price range object for filters
 * @param from
 * @param to (optional)
 */
class PriceSearchQueryDTO implements IPriceSearchQuery {
    from: number
    to: number

    constructor(priceQuery: string) {
        const [ from = 0, to ] = priceQuery.split('-');

        this.from = Number(from);
        this.to = to ? Number(to) : 1000000;
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
    restQueries: Object

    constructor({ page, price, sell, ...restQueries }: ISearchReqQueries) {
        this.page = Number(page) || 1;
        this.price = price ? new PriceSearchQueryDTO(price) : null;
        this.sell = typeof sell === 'string'
            ? isNaN(+sell) ? null: Number(sell)
            : null;
        this.restQueries = Object.keys(restQueries).length ? restQueries : null;
    }
}
