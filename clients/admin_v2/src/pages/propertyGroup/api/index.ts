import apiClient from '@shared/api/client';

import { PropertyGroupDTO } from './dto';
import { PropertyGroup } from '@shared/models/PropertyGroup';

export function createPropertyGroup(payload: PropertyGroupDTO) {
    return apiClient.post<PropertyGroup>('propertygroup', payload);
}

export function getPropertyGroups() {
    return apiClient.get<PropertyGroup[]>('propertygroup/list');
}

export function removePropertyGroup(id: PropertyGroup['id']) {
    return apiClient.delete(`propertygroup/${id}`);
}
