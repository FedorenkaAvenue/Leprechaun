import apiClient from "@shared/api/client"
import { CategoryModel } from "../model/Category"

export const getCategoryList = () => {
    return apiClient.get<CategoryModel[]>('/category/list').then(res => res.data);
}

export const getCategory = (url: CategoryModel['url']) => {
    return apiClient.get<CategoryModel>(`/category/${url}`).then(data => data.data);
}
