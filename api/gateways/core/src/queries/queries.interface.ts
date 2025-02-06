import { CategoryI } from "../category/category.interface";
import { ProductSort, ProductStatus } from "../product/product.enum";
import { LanguagesI } from "../trans/trans.interface";

export interface QueryPriceI {
    min: number;
    max: number;
}

export type QueryOptionsFiltersT = {
    [key: string]: string | number
};

export interface QueriesCommonI {
    lang: keyof LanguagesI;
}

export interface QueriesPaginationI extends QueriesCommonI {
    page: number;
    portion: number;
}

export interface QueriesProductListI<P = QueryPriceI> extends QueriesPaginationI {
    sort: ProductSort;
    status: ProductStatus | null;
    category: CategoryI['url']
    price: P;
    optionsFilter: QueryOptionsFiltersT | null;
}

export interface QueriesSearchI extends QueriesCommonI {
    substring: string;
}
