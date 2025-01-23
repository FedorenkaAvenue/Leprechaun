import { PropertyGroup, PropertyGroupPreview } from '../model/interfaces';
import { Category } from '@entities/category/model/interfaces';
import { rootApi } from '@shared/api';

export const propertyGroupEntityApi = rootApi.injectEndpoints({
    endpoints: build => ({
        propertyGroup: build.query<PropertyGroup, PropertyGroup['id']>({
            query: (id: PropertyGroup['id']) => ({
                url: `propertygroup/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'property_group', id }],
        }),
        propertyGroupList: build.query<PropertyGroupPreview[], void>({
            query: () => ({
                url: `propertygroup/list`,
            }),
            providesTags: ['property_group_list'],
        }),
        propertyGroupListByCategoryId: build.query<PropertyGroupPreview[], Category['id']>({
            query: (id: Category['id']) => ({
                url: `propertygroup/list/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'property_group_list', id }],
        }),
    })
});
