import UrlQueryParams from "../models/UrlQueryParams";

const URL_QUERY_PARAMS: Record<keyof UrlQueryParams, string> = {
    category: 'category',
    page: 'page',
} as const;

export default URL_QUERY_PARAMS;
