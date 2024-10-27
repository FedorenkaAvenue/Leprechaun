import apiClient from '@shared/api/client';

import PropertyGroupPreviewModel from '@entities/propertyGroup/model/PropertyGroup';
import { CategoryModel } from '@entities/category/model/Category';
import { PropertyGroupSchemaT } from '../models/schema';

export async function createPropertyGroup(payload: PropertyGroupSchemaT) {
    const res = await apiClient.post<PropertyGroupPreviewModel>('propertygroup', payload);
    return res.data;
}

export async function removePropertyGroup(id: PropertyGroupPreviewModel['id'] | undefined) {
    const res = await apiClient.delete(`propertygroup/${id}`);
    return res.data;;
}

export async function getPropertyGroupListByCategoryId(id: CategoryModel['id'] | undefined) {
    if (!id) return;
    const res = await apiClient.get<PropertyGroupPreviewModel[]>(`propertygroup/list/${id}`);
    return res.data;
}
