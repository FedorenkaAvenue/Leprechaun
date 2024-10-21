import apiClient from "@shared/api/client"
import { CategoryCreateDTO } from "../model/dto"
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";

export const createCategory = (category: CategoryCreateDTO) => {
    return apiClient.postForm<CategoryCreateDTO>('/category', category).then(data => data.data);
}

export const removeCategory = (id: CategoryPreviewModel['id'] | undefined) => {
    return apiClient.delete(`/category/${id}`);
}
