import PropertyModel from "@entities/property/model/Property";
import apiClient from "@shared/api/client";
import { PropertyCreateDTO } from "../models/dto";

export function removeProperty(id: PropertyModel['id']) {
    return apiClient.delete(`property/${id}`).then(res => res.data);
}

export function createProperty(property: PropertyCreateDTO) {
    return apiClient.post('property', property).then(res => res.data);
}
