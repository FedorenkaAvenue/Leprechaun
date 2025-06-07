import { toast } from 'react-toastify';

import { PropertyGroup, PropertyGroupPreview } from '../model/interfaces';
import { Category } from '@entities/category/model/interfaces';
import { rootApi } from '@shared/api';
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from '@features/propertyGroup/api/dto';
import { Property } from '@entities/property/model/interfaces';
import { PropertyCreateDTO } from '@features/property/api/dto';

export const propertyGroupApi = rootApi.injectEndpoints({
    endpoints: build => ({
        propertyGroup: build.query<PropertyGroup, PropertyGroup['id']>({
            query: id => ({
                url: `/propertygroup/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'property_group', id }],
        }),
        propertyGroupList: build.query<PropertyGroupPreview[], void>({
            query: () => ({
                url: `/propertygroup/list`,
            }),
            providesTags: ['property_group_list'],
        }),
        propertyGroupListByCategoryId: build.query<PropertyGroupPreview[], Category['id'] | undefined>({
            query: id => ({
                url: `/propertygroup/list/${id}`,
            }),
            providesTags: (_, __, id) => [{ type: 'property_group_list', id }],
        }),
        createPropertyGroup: build.mutation<PropertyGroupPreview, { data: PropertyGroupCreateDTO, successCallback?: () => void }>({
            query: ({ data }) => ({
                url: '/propertygroup',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted({ successCallback }, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Property group is created' });

                const { data } = await queryFulfilled;

                successCallback?.call(null);
                dispatch(
                    propertyGroupApi.util.updateQueryData('propertyGroupList', undefined, propertyGroupList => {
                        propertyGroupList.unshift(data);
                    })
                );
            },
        }),
        updatePropertyGroup: build.mutation<void, { id: PropertyGroup['id'], updates: PropertyGroupUpdateDTO }>({
            query: ({ id, updates }) => ({
                url: `/propertygroup/${id}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (_, __, { id }) => ([{ type: 'property_group', id }]),
            async onQueryStarted({ id, updates }, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Property group is updated' });

                const patch = dispatch(
                    propertyGroupApi.util.updateQueryData('propertyGroupList', undefined, propertyGroupList => {
                        propertyGroupList.forEach(pg => {
                            if (pg.id === id) pg = Object.assign(pg, updates);
                        })
                    })
                );

                try {
                    await queryFulfilled;
                } catch (err) {
                    patch.undo();
                }
            },
        }),
        removePropertyGroup: build.mutation<PropertyGroupPreview, { id: PropertyGroup['id'], successCallback?: () => void }>({
            query: ({ id }) => ({
                url: `/propertygroup/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { id }) => ([{ type: 'property_group', id }]),
            async onQueryStarted({ id, successCallback }, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Property group is deleted' });

                const patch = dispatch(
                    propertyGroupApi.util.updateQueryData('propertyGroupList', undefined, propertyGroupList => {
                        const index = propertyGroupList.findIndex(pg => pg.id === id);

                        propertyGroupList.splice(index, 1);
                    })
                );

                try {
                    await queryFulfilled;
                    successCallback?.call(null);
                } catch (err) {
                    patch.undo();
                }
            },
        }),
        createProperty: build.mutation<Property, { data: PropertyCreateDTO, successCallback?: () => void }>({
            query: ({ data }) => ({
                url: '/property',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted({ data: { propertygroup }, successCallback }, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled;

                successCallback?.call(null);
                dispatch(
                    propertyGroupApi.util.updateQueryData('propertyGroup', propertygroup, propertyGroup => {
                        propertyGroup.properties?.unshift(data);
                    })
                );
            },
        }),
        removeProperty: build.mutation<void, { propertyId: Property['id'], propertyGroupId: PropertyGroup['id'] }>({
            query: ({ propertyId }) => ({
                url: `/property/${propertyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => (['property_group_list']),
            async onQueryStarted({ propertyId, propertyGroupId }, { queryFulfilled, dispatch }) {
                toast.promise(queryFulfilled, { pending: 'Loading', success: 'Property is deleted' });

                const patch = dispatch(
                    propertyGroupApi.util.updateQueryData('propertyGroup', propertyGroupId, propertyGroup => {
                        const propertyIndex = propertyGroup.properties?.findIndex(property => property.id === propertyId);

                        propertyGroup.properties?.splice(propertyIndex, 1);
                    })
                );

                try {
                    await queryFulfilled;
                } catch (err) {
                    patch.undo();
                }
            },
        }),
    })
});
