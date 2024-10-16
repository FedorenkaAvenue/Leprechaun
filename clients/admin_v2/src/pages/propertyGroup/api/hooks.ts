import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PropertyGroupDTO } from "./dto";
import { createPropertyGroup, getPropertyGroups, removePropertyGroup } from "./index";
import { PROPERTY_GROUPS } from "@shared/constants/queryKeys";
import { PropertyGroup } from "@shared/models/PropertyGroup";

export function useCreatePropertyGroup(successCallback: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: PropertyGroupDTO) => createPropertyGroup(body),
        onSuccess: () => {
            successCallback();
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUPS] })
        },
    })
}

export function usePropertyGroups() {
    return useQuery({
        queryKey: [PROPERTY_GROUPS],
        queryFn: () => getPropertyGroups(),
    })
}

export function useDeletePropertyGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: PropertyGroup['id']) => removePropertyGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUPS] })
        },
    })
}
