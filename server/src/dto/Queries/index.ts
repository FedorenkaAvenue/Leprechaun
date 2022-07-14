import { DinamicQueryFilters, IPriceSearchQuery, ISearchQueries } from '@interfaces/Queries';
import { SortType } from '@enums/Query';
import { ProductStatus } from '@enums/Product';

export class RangeQueryDTO implements IPriceSearchQuery {
    min: number;
    max: number;
}

export class SearchQueriesDTO implements ISearchQueries {
    sort: SortType;
    page: number
    price: IPriceSearchQuery
    status: ProductStatus;
    dinamicFilters: DinamicQueryFilters;
}

export class QueryGETListDTO {
    queryList: Array<string> | null;
}
