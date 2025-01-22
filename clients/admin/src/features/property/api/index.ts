import apiClient from "@shared/api/client";
import { PropertyCreateDTO } from "../models/dto";
import { Property } from "@entities/property/model/interfaces";

export function removeProperty(id: Property['id']): Promise<void> {
    return apiClient.delete(`property/${id}`).then(res => res.data);
}

export function createProperty(property: PropertyCreateDTO): Promise<void> {
    return apiClient.post('property', property).then(res => res.data);
}
