import apiClient from "@shared/api/client"
import { CategorySchemaT } from "../model/schema";
import { CategoryPreview } from "@entities/category/model/interfaces";

export const removeCategory = (id: CategoryPreview['id']) => {
    return apiClient.delete(`/category/${id}`);
}

export const createCategory = (category: CategorySchemaT) => {
    return apiClient.postForm<CategorySchemaT>('/category', category);
}
