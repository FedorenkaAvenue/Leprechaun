import { useQuery } from "@tanstack/react-query";

import { PROPERTY_GROUP_LIST_QUERY, PROPERTY_GROUP_QUERY } from "../constants/queryKeys";
import { getPropertyGroup, getPropertyGroupList } from ".";
import PropertyGroupModel from "../model/PropertyGroupPreview";

type propertyGroupId = PropertyGroupModel['id']

export function usePropertyGroupList() {
    return useQuery({
        queryKey: [PROPERTY_GROUP_LIST_QUERY],
        queryFn: () => getPropertyGroupList(),
    })
}

export function usePropertyGroup(id: propertyGroupId | undefined) {
    return useQuery({
        queryKey: [PROPERTY_GROUP_QUERY, id],
        queryFn: () => getPropertyGroup(id as propertyGroupId),
    })
}
