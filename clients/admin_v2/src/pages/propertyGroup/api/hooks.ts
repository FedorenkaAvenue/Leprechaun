import { PROPERTY_GROUP_LIST_QUERY } from "@entities/propertyGroup/constants/queryKeys";
import { createPropertyGroup } from "@features/propertyGroup/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropertyGroupCreateDTO } from "./dto";

export function useCreatePropertyGroup(successCallback: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: PropertyGroupCreateDTO) => createPropertyGroup(body),
        onSuccess: () => {
            successCallback();
            queryClient.invalidateQueries({ queryKey: [PROPERTY_GROUP_LIST_QUERY] })
        },
    })
}