import apiClient from "@shared/api/client"
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";
import { CategorySchemaT } from "../model/schema";

export const removeCategory = (id: CategoryPreviewModel['id'] | undefined) => {
    return apiClient.delete(`/category/${id}`);
}

export const createCategory = (category: CategorySchemaT) => {
    return apiClient.postForm<CategorySchemaT>('/category', category);
}
