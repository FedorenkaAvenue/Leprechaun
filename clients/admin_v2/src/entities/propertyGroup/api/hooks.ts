import { useQuery } from "@tanstack/react-query";

import { PROPERTY_GROUP_QUERY } from "../constants/queryKeys";
import { getPropertyGroup } from ".";
import PropertyGroupModel from "../model/PropertyGroupPreview";

type propertyGroupId = PropertyGroupModel['id']

export function usePropertyGroup(id: propertyGroupId | undefined) {
    return useQuery({
        queryKey: [PROPERTY_GROUP_QUERY, id],
        queryFn: () => getPropertyGroup(id as propertyGroupId),
    })
}
