import apiClient from "@shared/api/client"
import { CategoryModel } from "../model/Category";

export const getCategory = async (url: CategoryModel['url'] | undefined) => {
    const data = await apiClient.get<CategoryModel>(`/category/${url}`);
    return data.data;
}
