import axios from 'axios';

import { CLIENT_DOMAIN_API } from '../constants/api';

const clientAPI = axios.create({ baseURL: CLIENT_DOMAIN_API, withCredentials: true });

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

export default clientAPI;
