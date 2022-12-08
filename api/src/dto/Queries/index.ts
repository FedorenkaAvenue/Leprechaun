import { DinamicQueryFiltersT, QueryPriceI, QueriesI } from '@interfaces/Queries';
import { ProductStatusE } from '@enums/Product';

export class RangeQueryDTO implements QueryPriceI {
    min: number;
    max: number;
}

export class QueriesDTO implements QueriesI<unknown> {
    lang: string;
    sort: unknown;
    page: number;
    portion: number;
    price: QueryPriceI;
    status: ProductStatusE;
    dinamicFilters: DinamicQueryFiltersT;
}

export class QueryGETListDTO {
    queryList: string[] | null;
}
