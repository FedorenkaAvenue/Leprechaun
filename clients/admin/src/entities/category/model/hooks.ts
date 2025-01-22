import { useQuery } from "@tanstack/react-query";

import { CATEGORY_LIST_QUERY, CATEGORY_QUERY } from "../constants/queryKeys";
import { Category } from "./interfaces";
import { getCategory, getCategoryList } from "../api";

export function useCategory(url: Category['url'] | undefined) {
    return useQuery({
        queryFn: () => getCategory(url as Category['url']),
        queryKey: [CATEGORY_QUERY, url],
        enabled: Boolean(url),
    })
}

export function useCategoryList() {
    return useQuery({
        queryFn: () => getCategoryList(),
        queryKey: [CATEGORY_LIST_QUERY],
    });
}
