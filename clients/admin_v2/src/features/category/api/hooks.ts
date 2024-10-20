import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory, removeCategory } from ".";
import { CategoryCreateDTO } from "../model/dto";
import { CategoryModel } from "@entities/category/model/Category";
import { CATEGORY_LIST_QUERY } from "@entities/category/constants/queryKeys";

export function useCreateCategory(successCallback?: () => void) {
    return useMutation({
        mutationFn: (data: CategoryCreateDTO) => createCategory(data),
        onSuccess: () => {
            successCallback?.call(null);
        }
    });
}

export function useRemoveCategory(id: CategoryModel['id']) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: () => removeCategory(id),
        onSuccess: () => {
            const query = client.getQueryData<CategoryModel[]>([CATEGORY_LIST_QUERY]);
            client.setQueryData([CATEGORY_LIST_QUERY], query?.filter(i => i.id !== id));
        }
    });
}
