import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProperty, removeProperty } from "../api";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";
import { Property } from "@entities/property/model/interfaces";
import { PropertySchema } from "./schema";

export function useDeleteProperty(groupId: PropertyGroupPreview['id']) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: Property['id']) => removeProperty(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['PROPERTY_GROUP_QUERY', groupId] });
            queryClient.invalidateQueries({ queryKey: ['PROPERTY_GROUP_LIST_QUERY'] });
        },
    })
}

export function useCreateProperty(groupId: PropertyGroupPreview['id'], successCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (property: PropertySchema) => createProperty({ ...property, propertygroup: groupId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['PROPERTY_GROUP_QUERY', groupId] });
            successCallback?.call(null);
        },
    })
}
