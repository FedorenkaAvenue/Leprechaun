import serverAPI from "@lib/api";
import { CategoryModel } from "@models/Category";

export async function getCategoryList() {
    const data = await serverAPI.get<CategoryModel[]>('/category/list');
    return data.data;
}
