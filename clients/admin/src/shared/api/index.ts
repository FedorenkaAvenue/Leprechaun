import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CATEGORY_LIST_QUERY, CATEGORY_QUERY } from '@entities/category/constants/queryKeys';
import { PRODUCT_LIST_QUERY, PRODUCT_QUERY } from '@entities/product/constants/queryKeys';
import { PROPERTY_GROUP_LIST_QUERY, PROPERTY_GROUP_QUERY } from '@entities/propertyGroup/constants/queryKeys';

export const rootApi = createApi({
    tagTypes: [
        CATEGORY_LIST_QUERY, CATEGORY_QUERY, PRODUCT_QUERY, PRODUCT_LIST_QUERY, PROPERTY_GROUP_QUERY,
        PROPERTY_GROUP_LIST_QUERY,
    ],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_DOMAIN_API}/adm` }),
    endpoints: () => ({}),
});
