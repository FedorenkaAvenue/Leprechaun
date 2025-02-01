import { toast } from "react-toastify";
import { toFormData } from "axios";

import { Category, CategoryPreview } from "../model/interfaces";
import { rootApi } from "@shared/api";
import { CategoryCreateDTO, CategoryUpdateDTO } from "@features/category/api/dto";

export const categoryApi = rootApi.injectEndpoints({
    endpoints: build => ({
        category: build.query<Category, Category['url']>({
            query: (url: Category['url']) => ({
                url: `/adm/category/${url}`,
            }),
            providesTags: (_, __, url) => [{ type: 'category', id: url }],
        }),
        categoryList: build.query<CategoryPreview[], void>({
            query: () => ({
                url: '/adm/category/list',
            }),
            providesTags: ['category_list'],
        }),
        createCategory: build.mutation<CategoryPreview, { body: CategoryCreateDTO, successCallback?: () => void }>({
            query: ({ body }) => {
                return ({
                    url: '/adm/category',
                    method: 'POST',
                    body: toFormData(body),
                });
            },
            async onQueryStarted({ body, successCallback }, { dispatch, queryFulfilled }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: `Category ${body.url} is created` });

                const { data: createdCategory } = await queryFulfilled;

                successCallback?.call(null);
                dispatch(
                    categoryApi.util.updateQueryData('categoryList', undefined, categoryList => {
                        categoryList.unshift(createdCategory);
                    })
                );
            },
        }),
        updateCategory: build.mutation<void, { id: Category['id'], updates: CategoryUpdateDTO, successCallback?: () => void }>({
            query: ({ id, updates }) => {
                return ({
                    url: `/adm/category/${id}`,
                    method: 'PATCH',
                    body: toFormData(updates),
                });
            },
            invalidatesTags: (_, __, { id }) => ([{ type: 'category', id }]),
            async onQueryStarted({ id, updates, successCallback }, { dispatch, queryFulfilled }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Category is updated' });

                const patch = dispatch(
                    categoryApi.util.updateQueryData('categoryList', undefined, categoryList => {
                        categoryList.forEach(category => {
                            if (category.id === id) category = Object.assign(category, updates);
                        });
                    })
                );

                try {
                    await queryFulfilled;
                    successCallback?.call(null);
                } catch (_) {
                    patch.undo();
                }
            },
        }),
        removeCategory: build.mutation<void, { id: Category['id']; removeCallback?: () => void }>({
            query: ({ id }) => ({
                url: `/adm/category/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ id, removeCallback }, { dispatch, queryFulfilled }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: `Category deleted` });

                const patch = dispatch(
                    categoryApi.util.updateQueryData('categoryList', undefined, categoryList => {
                        const index = categoryList.findIndex(category => category.id === id);

                        categoryList.splice(index, 1);
                    }),
                );

                try {
                    await queryFulfilled;
                    removeCallback?.call(null);
                } catch (error) {
                    patch.undo();
                }
            },
        }),
    }),
});
