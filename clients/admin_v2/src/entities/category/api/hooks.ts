import { useQuery } from "@tanstack/react-query";

import { getCategory, getCategoryList } from ".";
import { CATEGORY_LIST_QUERY, CATEGORY_QUERY } from "../constants/queryKeys";
import { CategoryModel } from "../model/Category";

export function useCategoryList() {
    return useQuery({
        queryFn: () => getCategoryList(),
        queryKey: [CATEGORY_LIST_QUERY],
    });
}

export function useCategory(url: CategoryModel['url']) {
    return useQuery({
        queryFn: () => getCategory(url),
        queryKey: [CATEGORY_QUERY, url],
    })
}
