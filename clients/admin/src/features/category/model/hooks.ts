import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory, removeCategory } from "../api";
import { CATEGORY_LIST_QUERY } from "@entities/category/constants/queryKeys";
import { CategorySchemaT } from "../model/schema";
import { CategoryPreview } from "@entities/category/model/interfaces";

export function useRemoveCategory(id: CategoryPreview['id'], removeCallback?: () => void) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => removeCategory(id),
        onSuccess: () => {
            removeCallback?.call(null);
            const query = client.getQueryData<CategoryPreview[]>([CATEGORY_LIST_QUERY]);
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
