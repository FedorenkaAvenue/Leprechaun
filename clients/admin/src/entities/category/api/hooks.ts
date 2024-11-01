import { useQuery } from "@tanstack/react-query";

import { getCategory } from ".";
import { CATEGORY_QUERY } from "../constants/queryKeys";
import { CategoryModel } from "../model/Category";

export function useCategory(url: CategoryModel['url'] | undefined) {
    return useQuery({
        queryFn: () => getCategory(url),
        queryKey: [CATEGORY_QUERY, url],
    })
}
