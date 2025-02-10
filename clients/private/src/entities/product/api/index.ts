import { toast } from "react-toastify";
import { toFormData } from "axios";

import { Product, ProductListUrlQueryParams, ProductPreview } from "../model/interfaces";
import { Pagination } from "@shared/models/interfaces";
import { rootApi } from "@shared/api";
import { ProductCreateDTO, ProductUpdateDTO } from "@features/product/api/dto";

export const productApi = rootApi.injectEndpoints({
    endpoints: build => ({
        product: build.query<Product, Product['id']>({
            query: id => ({
                url: `/private/product/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'product', id }],
        }),
        productList: build.query<Pagination<ProductPreview[]>, ProductListUrlQueryParams>({
            query: (args: ProductListUrlQueryParams) => ({
                url: '/private/product/list',
                params: args,
            }),
            providesTags: (_, __, args) => args
                ? [
                    { type: 'product_list', id: `${Object.entries(args).map(([k, v]) => `${k}=${v}`).toString()}` },
                    { type: 'product_list' },
                ]
                : [{ type: 'product_list' }],
        }),
        createProduct: build.mutation<void, { newProduct: ProductCreateDTO, successCallback?: () => void }>({
            query: ({ newProduct }) => ({
                url: '/private/product',
                method: 'POST',
                body: toFormData(newProduct),
            }),
            invalidatesTags: ['product_list'],
            async onQueryStarted({ successCallback }, { queryFulfilled }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Product is created' });
                await queryFulfilled;
                successCallback?.call(null);
            },
        }),
        updateProduct: build.mutation<void, { id: Product['id'], updates: ProductUpdateDTO }>({
            query: ({ id, updates }) => ({
                url: `/private/product/${id}`,
                method: 'PATCH',
                body: toFormData(updates),
            }),
            invalidatesTags: (_, __, { id }) => ([{ type: 'product', id }]),
            async onQueryStarted({ id, updates }, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Product is updated' });

                const patch = dispatch(productApi.util.updateQueryData('product', id, product => {
                    product = Object.assign(product, updates);
                }));

                try {
                    await queryFulfilled;
                    dispatch(productApi.util.invalidateTags(['product_list']));
                } catch (err) {
                    patch.undo();
                }
            },
        }),
        removeProduct: build.mutation<undefined, Product['id']>({
            query: productId => ({
                url: `/private/product/${productId}`,
                method: 'DELETE',
            }),
            // invalidatesTags: (_, __, id) => ([{ type: 'product', id }, 'product_list']), // ? after removing always triggers invalidate and server returns 404
            invalidatesTags: () => (['product_list']),
            async onQueryStarted(productId, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Product is deleted' });

                const patch = dispatch(productApi.util.updateQueryData('product', productId, () => {
                    return undefined;
                }));

                try {
                    await queryFulfilled;
                } catch (_) {
                    patch.undo();
                }
            }
        }),
    }),
});
