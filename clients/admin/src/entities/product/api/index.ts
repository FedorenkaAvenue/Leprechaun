import { Product, ProductListUrlQueryParams, ProductPreview } from "../model/interfaces";
import { Pagination } from "@shared/models/interfaces";
import { rootApi } from "@shared/api";

export const productEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        product: build.query<Product, Product['id']>({
            query: (id: Product['id']) => ({
                url: `/product/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'product', id }],
        }),
        productList: build.query<Pagination<ProductPreview[]>, ProductListUrlQueryParams>({
            query: (args: ProductListUrlQueryParams) => ({
                url: '/product/list',
                params: args,
            }),
            providesTags: (_, __, args) => [{ type: 'product_list' }],
        })
    }),
});
