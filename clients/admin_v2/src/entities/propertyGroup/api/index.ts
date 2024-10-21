import apiClient from '@shared/api/client';
import PropertyGroupModel from '../model/PropertyGroup';

export function getPropertyGroupList() {
    return apiClient.get<PropertyGroupModel[]>('propertygroup/list').then(res => res.data);
}

export function getPropertyGroup(id: PropertyGroupModel['id']) {
    return apiClient.get<PropertyGroupModel>(`propertygroup/${id}`).then(res => res.data);
}
