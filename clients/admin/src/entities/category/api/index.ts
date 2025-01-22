import apiClient from "@shared/api/client"
import { Category, CategoryPreview } from "../model/interfaces";

export const getCategory = async (url: Category['url']): Promise<Category> => {
    return (await apiClient.get<Category>(`/category/${url}`)).data;
}

export const getCategoryList = async (): Promise<CategoryPreview[]> => {
    return (await apiClient.get<CategoryPreview[]>('/category/list')).data;
}
