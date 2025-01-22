import { useQuery } from "@tanstack/react-query";

import { PROPERTY_GROUP_LIST_QUERY, PROPERTY_GROUP_QUERY } from "../constants/queryKeys";
import { getPropertyGroup, getPropertyGroupList, getPropertyGroupListByCategoryId } from "../api";
import { PropertyGroup } from '../model/interfaces';
import { CATEGORY_LIST_QUERY } from "@entities/category/constants/queryKeys";
import { Category } from "@entities/category/model/interfaces";

type propertyGroupId = PropertyGroup['id']

export function usePropertyGroup(id: propertyGroupId | undefined) {
    return useQuery({
        queryKey: [PROPERTY_GROUP_QUERY, id],
        queryFn: () => getPropertyGroup(id as propertyGroupId),
        enabled: Boolean(id),
    })
}

export function usePropertyGroupList() {
    return useQuery({
        queryKey: [PROPERTY_GROUP_LIST_QUERY],
        queryFn: () => getPropertyGroupList(),
    })
}

export function usePropertyGroupListByCategoryId(id: Category['id'] | undefined) {
    return useQuery({
        queryFn: () => getPropertyGroupListByCategoryId(id as Category['id']),
        queryKey: [CATEGORY_LIST_QUERY, id],
        enabled: Boolean(id),
    });
}
