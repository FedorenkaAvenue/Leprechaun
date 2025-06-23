import { QueriesCommon, QueriesPagination, RangeQuery } from "@common/queries/queries.dto";
import { QueryCommonParams, QueryPaginationParams, QueryPriceParams } from "@gen/common";
import { ProductQueryParams, ProductSort, ProductStatus } from "@gen/product";
import availableEnum from "@utils/availableEnum";

export class ProductQuerisDTO implements ProductQueryParams {
    sort: ProductSort;
    category: string;
    status: ProductStatus;
    price: QueryPriceParams;
    common: QueryCommonParams;
    pagination: QueryPaginationParams;

    constructor({ category, sort, page, portion, status, price, ...restQueries }: any) {
        Object.assign(this, restQueries);
        this.common = new QueriesCommon({ ...restQueries });
        this.sort = Number(sort) || ProductSort.POPULAR_SORT;
        this.status = availableEnum(status, ProductStatus) ? status : null;
        this.pagination = new QueriesPagination({ page, portion });
        this.category = category;
        this.price ? new RangeQuery(price) : null;
    }
}
