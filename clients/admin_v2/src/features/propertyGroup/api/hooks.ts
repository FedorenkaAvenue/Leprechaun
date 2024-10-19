import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPropertyGroup, removePropertyGroup } from "./index";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { PROPERTY_GROUP_LIST_QUERY } from "@entities/propertyGroup/constants/queryKeys";
import { PropertyGroupCreateDTO } from "../models/dto";

export function useCreatePropertyGroup(successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: PropertyGroupCreateDTO) => createPropertyGroup(body),
        onSuccess: (data) => {
            successCallback?.call(null);

            const groups = queryClient.getQueryData<PropertyGroupModel[]>([PROPERTY_GROUP_LIST_QUERY]) as PropertyGroupModel[];
            data.properties = [];

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                [...groups, data],
            );
        },
    })
}

export function useDeletePropertyGroup(id: PropertyGroupModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removePropertyGroup(id),
        onSuccess: () => {
            const groups = queryClient.getQueryData<PropertyGroupModel[]>([PROPERTY_GROUP_LIST_QUERY]);

            queryClient.setQueryData(
                [PROPERTY_GROUP_LIST_QUERY],
                groups?.filter(i => i.id !== id)
            );
        },
    })
}
