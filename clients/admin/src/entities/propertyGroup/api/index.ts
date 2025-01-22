import apiClient from '@shared/api/client';
import { PropertyGroup, PropertyGroupPreview } from '../model/interfaces';
import { Category } from '@entities/category/model/interfaces';

export async function getPropertyGroup(id: PropertyGroupPreview['id']): Promise<PropertyGroup> {
    return (await apiClient.get<PropertyGroup>(`propertygroup/${id}`)).data;
}

export async function getPropertyGroupList(): Promise<PropertyGroupPreview[]> {
    return (await apiClient.get<PropertyGroupPreview[]>('propertygroup/list')).data;
}

export async function getPropertyGroupListByCategoryId(id: Category['id']): Promise<PropertyGroupPreview[]> {
    return (await apiClient.get<PropertyGroupPreview[]>(`propertygroup/list/${id}`)).data;
}
