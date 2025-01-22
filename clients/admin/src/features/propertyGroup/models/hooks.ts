import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PROPERTY_GROUP_LIST_QUERY } from "@entities/propertyGroup/constants/queryKeys";
import { PropertyGroupSchemaT } from "../models/schema";
import { createPropertyGroup, removePropertyGroup } from "../api";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";


export function useCreatePropertyGroup(successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: PropertyGroupSchemaT) => createPropertyGroup(body),
        onSuccess: (data) => {
            successCallback?.call(null);

            const groups = queryClient.getQueryData<PropertyGroupPreview[]>([PROPERTY_GROUP_LIST_QUERY]) as PropertyGroupPreview[];
            data.properties = [];

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                [...groups, data],
            );
        },
    })
}

export function useDeletePropertyGroup(id: PropertyGroupPreview['id'], removeCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removePropertyGroup(id),
        onSuccess: () => {
            removeCallback?.call(null);
            const groups = queryClient.getQueryData<PropertyGroupPreview[]>([PROPERTY_GROUP_LIST_QUERY]);

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                groups?.filter(i => i.id !== id)
            );
        },
    })
}
