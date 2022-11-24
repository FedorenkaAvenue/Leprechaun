import { DinamicQueryFiltersT, QueryPriceI, QueriesI } from '@interfaces/Queries';
import { SortTypeE } from '@enums/Query';
import { ProductStatusE } from '@enums/Product';

export class RangeQueryDTO implements QueryPriceI {
    min: number;
    max: number;
}

export class QueriesDTO implements QueriesI {
    sort: SortTypeE;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatusE;
    dinamicFilters: DinamicQueryFiltersT;
}

export class QueryGETListDTO {
    queryList: string[] | null;
}
