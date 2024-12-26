import { CategoryModel } from "../model/interfaces";
import { PaginationModel } from "@shared/models/Pagination";
import { ProductCardModel } from "@entities/product/model/interfaces";
import serverAPI from "@shared/api/api_server";

export async function getCategoryList(): Promise<CategoryModel[]> {
    const data = await serverAPI.get<CategoryModel[]>('/category/list');

    return data.data;
}

export async function getProductListByCategory(
    categoryUR: CategoryModel['url'], page: string | undefined = '1',
): Promise<PaginationModel<ProductCardModel>> {
    const res = await serverAPI.get<PaginationModel<ProductCardModel>>(
        `/product/category/${categoryUR}`,
        {
            params: { page },
        },
    );

    return res.data;
}

export async function getCategory(categoryUR: CategoryModel['url']): Promise<CategoryModel> {
    const res = await serverAPI.get<CategoryModel>(`/category/${categoryUR}`);

    return res.data;
}
