import apiClient from '@shared/api/client';

import PropertyGroupModel from '@entities/propertyGroup/model/PropertyGroup';
import { PropertyGroupCreateDTO } from '../models/dto';

export async function createPropertyGroup(payload: PropertyGroupCreateDTO) {
    const res = await apiClient.post<PropertyGroupModel>('propertygroup', payload);
    return res.data;
}

export async function removePropertyGroup(id: PropertyGroupModel['id']) {
    const res = await apiClient.delete(`propertygroup/${id}`);
    return res.data;;
}
