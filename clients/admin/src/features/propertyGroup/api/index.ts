import apiClient from '@shared/api/client';
import { PropertyGroupSchemaT } from '../models/schema';
import { PropertyGroupPreview } from '@entities/propertyGroup/model/interfaces';

export async function createPropertyGroup(payload: PropertyGroupSchemaT) {
    return (await apiClient.post<PropertyGroupPreview>('propertygroup', payload)).data;
}

export async function removePropertyGroup(id: PropertyGroupPreview['id']) {
    return (await apiClient.delete(`propertygroup/${id}`)).data;
}
