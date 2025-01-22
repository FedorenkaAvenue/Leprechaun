import { Product, ProductListUrlQueryParams, ProductPreview } from "../model/interfaces";
import { Pagination } from "@shared/models/interfaces";
import { rootApi } from "@shared/api";
import { PRODUCT_LIST_QUERY, PRODUCT_QUERY } from "../constants/queryKeys";

export const productEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        product: build.query<Product, any>({
            query: (id: Product['id']) => ({
                url: `/product/${id}`,
            }),
            providesTags: [PRODUCT_QUERY],
        }),
        productList: build.query<Pagination<ProductPreview[]>, any>({
            query: (args: ProductListUrlQueryParams) => ({
                url: '/product/list',
                params: args,
            }),
            providesTags: [PRODUCT_LIST_QUERY],
        })
    }),
});
