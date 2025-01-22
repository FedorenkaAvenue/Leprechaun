import { ProductListUrlQueryParams } from "@entities/product/model/interfaces";
import { ProductCreateUrlQueryParams } from "../model/urlQueryParams";

export const PRODUCT_LIST_URL_QUERY_PARAMS: Record<keyof ProductListUrlQueryParams, string> = {
    category: 'category',
    page: 'page',
} as const;

export const PRODUCT_CREATE_URL_QUERY_PARAMS: Record<keyof ProductCreateUrlQueryParams, string> = {
    category: 'category',
} as const;
