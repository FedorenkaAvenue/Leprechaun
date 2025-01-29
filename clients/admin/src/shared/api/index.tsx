import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { RootState } from '@app/store';

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
    baseUrl: string
}

let storeRef: (() => RootState) | null = null;

export const setStoreForAxios = (getStore: () => RootState) => {
    storeRef = getStore;
};

export const apiClient = axios.create({ baseURL: `${import.meta.env.VITE_DOMAIN_API}` });

apiClient.interceptors.request.use(
    (config) => {
        if (storeRef) {
            const state = storeRef();
            const token = state.user.accessToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    err => {
        Promise.reject(err);
    }
);

apiClient.interceptors.response.use(
    response => response.data,
    (err: AxiosError) => {
        switch (err.status) {
            case 401:
                toast.error('You\'are invader!')
                break;
            case 403:
                toast.error(<div>You don't have an access to do this action.<br /> Please, contact to admin.</div>)
                break;
            default:
                toast.error(`${err.status}. ${err.response?.statusText}`)
        }

        return Promise.reject(err?.response?.data || err);
    }
);

function axiosBaseQuery({ baseUrl }: AxiosBaseQueryParams): AxiosBaseQueryFn {
    return async function ({ url, method, data, params, headers }, api) {
        const { user } = api.getState() as RootState;

        const res = await apiClient.request({
            url: baseUrl + url,
            method,
            data,
            params,
            headers: { ...headers, Authorization: `Bearer ${user.accessToken}` },
        });

        return { data: res };
    }
}

export const rootApi = createApi({
    tagTypes: [
        'category_list', 'category', 'product', 'product_list', 'property_group', 'property_group_list',
    ],
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: '/adm' }),
    endpoints: () => ({}),
    refetchOnFocus: true,
    refetchOnReconnect: true,
});
