import apiClient from '@shared/api/client';
import PropertyGroupPreviewModel from '../model/PropertyGroup';
import PropertyGroupModel from '../model/PropertyGroupPreview';

export function getPropertyGroupList() {
    return apiClient.get<PropertyGroupPreviewModel[]>('propertygroup/list').then(res => res.data);
}

export function getPropertyGroup(id: PropertyGroupPreviewModel['id']) {
    return apiClient.get<PropertyGroupModel>(`propertygroup/${id}`).then(res => res.data);
}
