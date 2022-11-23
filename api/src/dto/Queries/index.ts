import { DinamicQueryFiltersT, QueryPriceI, QueriesI } from '@interfaces/Queries';
import { SortType } from '@enums/Query';
import { ProductStatus } from '@enums/Product';

export class RangeQueryDTO implements QueryPriceI {
    min: number;
    max: number;
}

export class QueriesDTO implements QueriesI {
    sort: SortType;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatus;
    dinamicFilters: DinamicQueryFiltersT;
}

export class QueryGETListDTO {
    queryList: string[] | null;
}
