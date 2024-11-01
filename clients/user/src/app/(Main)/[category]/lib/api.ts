import serverAPI from "@lib/api";
import { CategoryModel } from "@models/Category";
import { PaginationModel } from "@models/Pagination";
import { ProductPreviewModel } from "@models/Product";

export async function getProductListByCategory(categoryUR: CategoryModel['url'], page: string | undefined = '1') {
    const res = await serverAPI.get<PaginationModel<ProductPreviewModel>>(
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