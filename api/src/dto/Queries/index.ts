import { DinamicQueryFiltersT, PriceSearchQueryI, SearchQueriesI } from '@interfaces/Queries';
import { SortType } from '@enums/Query';
import { ProductStatus } from '@enums/Product';

export class RangeQueryDTO implements PriceSearchQueryI {
    min: number;
    max: number;
}

export class SearchQueriesDTO implements SearchQueriesI {
    sort: SortType;
    page: number;
    price: PriceSearchQueryI;
    status: ProductStatus;
    dinamicFilters: DinamicQueryFiltersT;
}

export class QueryGETListDTO {
    queryList: string[] | null;
}
