import apiClient from '@shared/api/client';

import PropertyGroupModel from '@entities/propertyGroup/model/PropertyGroup';
import { CategoryModel } from '@entities/category/model/Category';
import { PropertyGroupSchemaT } from '../models/schema';

export async function createPropertyGroup(payload: PropertyGroupSchemaT) {
    const res = await apiClient.post<PropertyGroupModel>('propertygroup', payload);
    return res.data;
}

export async function removePropertyGroup(id: PropertyGroupModel['id'] | undefined) {
    const res = await apiClient.delete(`propertygroup/${id}`);
    return res.data;;
}

export async function getPropertyGroupListByCategoryId(id: CategoryModel['id'] | undefined) {
    if (!id) return;
    const res = await apiClient.get<PropertyGroupModel[]>(`propertygroup/list/${id}`);
    return res.data;
}
