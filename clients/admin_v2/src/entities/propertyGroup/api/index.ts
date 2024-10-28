import apiClient from '@shared/api/client';
import PropertyGroupPreviewModel from '../model/PropertyGroup';
import PropertyGroupModel from '../model/PropertyGroupPreview';

export async function getPropertyGroup(id: PropertyGroupPreviewModel['id']) {
    const res = await apiClient.get<PropertyGroupModel>(`propertygroup/${id}`);
    return res.data;
}
