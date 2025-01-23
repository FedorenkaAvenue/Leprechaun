import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
    tagTypes: [
        'category_list', 'category', 'product', 'product_list', 'property_group', 'property_group_list',
    ],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_DOMAIN_API}/adm` }),
    endpoints: () => ({}),
    refetchOnFocus: true,
    refetchOnReconnect: true,
});
