import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCategory, getCategoryList, removeCategory } from ".";
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";
import { CATEGORY_LIST_QUERY } from "@entities/category/constants/queryKeys";
import { CategorySchemaT } from "../model/schema";

export function useCategoryList() {
    return useQuery({
        queryFn: () => getCategoryList(),
        queryKey: [CATEGORY_LIST_QUERY],
    });
}

export function useRemoveCategory(id: CategoryPreviewModel['id'] | undefined, removeCallback?: () => void) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => removeCategory(id),
        onSuccess: () => {
            removeCallback?.call(null);
            const query = client.getQueryData<CategoryPreviewModel[]>([CATEGORY_LIST_QUERY]);
            client.setQueryData([CATEGORY_LIST_QUERY], query?.filter(i => i.id !== id));
        }
    });
}

export function useCreateCategory(successCallback?: () => void) {
    return useMutation({
        mutationFn: (data: CategorySchemaT) => createCategory(data),
        onSuccess: () => {
            successCallback?.call(null);
        }
    });
}
