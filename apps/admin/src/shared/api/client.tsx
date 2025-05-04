import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { EnhancedStore } from '@reduxjs/toolkit';

import { errorSetAction } from '@shared/models/slices/error';
import { authSignInForceAction, authSignOutForceAction } from '@shared/models/slices/auth';
import { refreshAccessToken } from './auth';

let storeRef: EnhancedStore | null = null;

export const setStoreForAxios = (getStore: EnhancedStore) => {
    storeRef = getStore;
};

export const apiClient = axios.create({ baseURL: `${import.meta.env.VITE_DOMAIN_API}` });

apiClient.interceptors.request.use(
    config => {
        if (storeRef) {
            const state = storeRef.getState();
            const token = state.auth.accessToken;

            if (token) config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    err => Promise.reject(err),
);

apiClient.interceptors.response.use(
    response => response.data,
    async (err: AxiosError) => {
        const originalRequest: any = err.config;

        switch (err.response?.status) {
            case 400:
            case 406:
                toast.error((err.response as AxiosResponse<{ message: string }>).data.message)
                break;
            case 401:
                if (!originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
                    originalRequest._retry = true;

                    try {
                        const { accessToken } = await refreshAccessToken();

                        storeRef?.dispatch(authSignInForceAction({ accessToken }));
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return apiClient(originalRequest);
                    } catch (err) {
                        storeRef?.dispatch(authSignOutForceAction());

                        return Promise.reject(err);
                    }
                }

                break;
            case 403:
                toast.error(<div>You don't have an access to do this action.<br /> Please, contact to admin.</div>)
                break;
            case 500:
            case 501:
            case 502:
            case 503:
                storeRef?.dispatch(errorSetAction({ status: 500, message: 'LOH' }));
                break;
            default:
                toast.error(`${err.status}. ${err.response?.statusText}`)
        }

        return Promise.reject(err?.response?.data || err);
    }
);