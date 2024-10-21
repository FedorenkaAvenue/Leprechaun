import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProperty, removeProperty } from ".";
import { PROPERTY_GROUP_LIST_QUERY, PROPERTY_GROUP_QUERY } from "@entities/propertyGroup/constants/queryKeys";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { PropertyCreateDTO } from "../models/dto";
import PropertyModel from "@entities/property/model/Property";

export function useDeleteProperty(groupId: PropertyGroupModel['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: PropertyModel['id']) => removeProperty(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUP_QUERY, groupId] });
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUP_LIST_QUERY] });
        },
    })
}

export function useCreateProperty(groupId: PropertyGroupModel['id'], successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (property: PropertyCreateDTO) => createProperty({ ...property, propertygroup: groupId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUP_QUERY, groupId] });
            successCallback?.call(null);
        },
    })
}
