import apiClient from "@shared/api/client"
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";
import { CategorySchemaY } from "../model/schema";

export const removeCategory = (id: CategoryPreviewModel['id'] | undefined) => {
    return apiClient.delete(`/category/${id}`);
}

export const createCategory = (category: CategorySchemaY) => {
    return apiClient.postForm<CategorySchemaY>('/category', category).then(data => data.data);
}
