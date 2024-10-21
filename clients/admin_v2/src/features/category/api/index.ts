import apiClient from "@shared/api/client"
import { CategoryCreateDTO } from "../model/dto"
import { CategoryModel } from "@entities/category/model/Category";

export const createCategory = (category: CategoryCreateDTO) => {
    return apiClient.postForm<CategoryCreateDTO>('/category', category).then(data => data.data);
}

export const removeCategory = (id: CategoryModel['id']) => {
    return apiClient.delete(`/category/${id}`);
}
