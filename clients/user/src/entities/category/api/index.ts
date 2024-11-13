import { serverAPI } from "@shared/lib/api";
import { CategoryModel } from "../models/Category";
import { PaginationModel } from "@shared/models/Pagination";
import { ProductCardModel } from "@entities/product/models/Product";

export async function getCategoryList() {
    const data = await serverAPI.get<CategoryModel[]>('/category/list');
    return data.data;
}

export async function getProductListByCategory(categoryUR: CategoryModel['url'], page: string | undefined = '1') {
    const res = await serverAPI.get<PaginationModel<ProductCardModel>>(
        `/product/category/${categoryUR}`,
        {
            params: { page },
        },
    );

    return res.data;
}

export async function getCategory(categoryUR: CategoryModel['url']) {
    const res = await serverAPI.get<CategoryModel>(`/category/${categoryUR}`);

    return res.data;
}
