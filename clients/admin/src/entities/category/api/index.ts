import { Category, CategoryPreview } from "../model/interfaces";
import { rootApi } from "@shared/api";
import { CATEGORY_LIST_QUERY, CATEGORY_QUERY } from "../constants/queryKeys";

export const categoryEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        category: build.query<Category, any>({
            query: (url: Category['url']) => ({
                url: `/category/${url}`,
            }),
            providesTags: [CATEGORY_QUERY],
        }),
        categoryList: build.query<CategoryPreview[], void>({
            query: () => ({
                url: '/category/list',
            }),
            providesTags: [CATEGORY_LIST_QUERY],
        }),
    }),
});
