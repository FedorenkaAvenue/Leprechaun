import { PropertyGroup, PropertyGroupPreview } from '../model/interfaces';
import { Category } from '@entities/category/model/interfaces';
import { rootApi } from '@shared/api';
import { PROPERTY_GROUP_LIST_QUERY, PROPERTY_GROUP_QUERY } from '../constants/queryKeys';

export const propertyGroupEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        propertyGroup: build.query<PropertyGroup, any>({
            query: (id: PropertyGroup['id']) => ({
                url: `propertygroup/${id}`,
            }),
            providesTags: [PROPERTY_GROUP_QUERY],
        }),
        propertyGroupList: build.query<PropertyGroupPreview[], any>({
            query: () => ({
                url: `propertygroup/list`,
            }),
            providesTags: [PROPERTY_GROUP_LIST_QUERY],
        }),
        propertyGroupListByCategoryId: build.query<PropertyGroupPreview[], any>({
            query: (id: Category['id']) => ({
                url: `propertygroup/list/${id}`,
            }),
            providesTags: [PROPERTY_GROUP_LIST_QUERY],
        }),
    })
});
