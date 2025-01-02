import { CategoryModel } from "../model/interfaces";
import { PaginationModel } from "@shared/models/Pagination";
import { ProductCardModel } from "@entities/product/model/interfaces";
import serverAPI from "@shared/api/serverApi";

export async function getCategoryList(): Promise<CategoryModel[]> {
    return (await serverAPI.get<CategoryModel[]>('/category/list')).data;
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
    return (await serverAPI.get<CategoryModel>(`/category/${categoryUR}`)).data;
}
