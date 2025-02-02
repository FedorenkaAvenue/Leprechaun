import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';

import { RootState } from '@app/store';
import { apiClient } from './client';

type AxiosBaseQueryFn = BaseQueryFn<
    {
        url: string
        method?: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params']
        headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
>

type AxiosBaseQueryParams = {
    baseUrl?: string
}

function axiosBaseQuery(queryParams?: AxiosBaseQueryParams): AxiosBaseQueryFn {
    return async function ({ url, method, data, params, headers }, api) {
        const { auth } = api.getState() as RootState;

        const res = await apiClient.request({
            url: queryParams?.baseUrl ? queryParams.baseUrl + url : url,
            method,
            data,
            params,
            headers: { ...headers, Authorization: `Bearer ${auth.accessToken}` },
        });

        return { data: res };
    }
}

export const rootApi = createApi({
    tagTypes: [
        'category_list', 'category', 'product', 'product_list', 'property_group', 'property_group_list', 'employer',
        'employer_list',
    ],
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    refetchOnFocus: true,
    refetchOnReconnect: true,
});
