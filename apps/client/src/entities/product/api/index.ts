'use server'

import { RouteProps } from '@shared/models/router';
import { ProductCardModel, ProductOverviewModel } from '../model/interfaces';
import serverAPI from '@shared/api/serverApi';
import { PaginationModel } from '@shared/models/Pagination';

type ProductListQueries = Awaited<RouteProps['searchParams']> & {
    category: string
};

export async function getProduct(id: ProductOverviewModel['id']): Promise<ProductOverviewModel> {
    return (await serverAPI.get<ProductOverviewModel>(`/product/${id}`)).data;
}

export async function getProductList(searchParams: ProductListQueries): Promise<PaginationModel<ProductCardModel>> {
    const res = await serverAPI.get<PaginationModel<ProductCardModel>>(
        '/product/list',
        {
            params: { ...searchParams },
        },
    );

    return res.data;
}
