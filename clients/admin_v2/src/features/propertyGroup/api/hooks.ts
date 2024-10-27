import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPropertyGroup, getPropertyGroupListByCategoryId, removePropertyGroup } from "./index";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import { PROPERTY_GROUP_LIST_QUERY } from "@entities/propertyGroup/constants/queryKeys";
import { CategoryModel } from "@entities/category/model/Category";
import { CATEGORY_LIST_QUERY } from "@entities/category/constants/queryKeys";
import { PropertyGroupSchemaT } from "../models/schema";

export function useCreatePropertyGroup(successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: PropertyGroupSchemaT) => createPropertyGroup(body),
        onSuccess: (data) => {
            successCallback?.call(null);

            const groups = queryClient.getQueryData<PropertyGroupPreviewModel[]>([PROPERTY_GROUP_LIST_QUERY]) as PropertyGroupPreviewModel[];
            data.properties = [];

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                [...groups, data],
            );
        },
    })
}

export function useDeletePropertyGroup(id: PropertyGroupPreviewModel['id'] | undefined, removeCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removePropertyGroup(id),
        onSuccess: () => {
            removeCallback?.call(null);
            const groups = queryClient.getQueryData<PropertyGroupPreviewModel[]>([PROPERTY_GROUP_LIST_QUERY]);

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                groups?.filter(i => i.id !== id)
            );
        },
    })
}

export function usePropertyGroupListByCategoryId(id: CategoryModel['id'] | undefined) {
    return useQuery({
        queryFn: () => getPropertyGroupListByCategoryId(id),
        queryKey: [CATEGORY_LIST_QUERY, id],
    });
}
