import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const apiClient = axios.create({ baseURL: `${import.meta.env.VITE_DOMAIN_API}` });

// apiClient.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// apiFront.interceptors.request.use(
//     (config) => {
//         const token = window.localStorage.getItem(APP_STORE_KEYS.TOKEN);

//         if (token) {
//             // eslint-disable-next-line no-param-reassign
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default apiClient;
