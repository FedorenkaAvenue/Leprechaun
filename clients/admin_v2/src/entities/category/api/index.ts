import apiClient from "@shared/api/client"
import { CategoryPreviewModel } from "../model/CategoryPreview"
import { CategoryModel } from "../model/Category";

export const getCategoryList = () => {
    return apiClient.get<CategoryPreviewModel[]>('/category/list').then(res => res.data);
}

export const getCategory = (url: CategoryModel['url'] | undefined) => {
    return apiClient.get<CategoryModel>(`/category/${url}`).then(data => data.data);
}
