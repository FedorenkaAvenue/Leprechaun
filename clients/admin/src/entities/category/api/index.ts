import { Category, CategoryPreview } from "../model/interfaces";
import { rootApi } from "@shared/api";

export const categoryEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        category: build.query<Category, Category['url']>({
            query: (url: Category['url']) => ({
                url: `/category/${url}`,
            }),
            // providesTags: [CATEGORY_QUERY],
            providesTags: (_, __, url) => [{ type: 'category', id: url }],
        }),
        categoryList: build.query<CategoryPreview[], void>({
            query: () => ({
                url: '/category/list',
            }),
            providesTags: ['category_list'],
        }),
    }),
});
