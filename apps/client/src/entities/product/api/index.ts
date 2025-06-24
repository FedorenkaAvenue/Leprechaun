'use server'

import { RouteProps } from '@shared/models/router';
import serverAPI from '@shared/api/serverApi';
import { PaginationModel } from '@shared/models/Pagination';
import { ProductCardPublic, ProductPublic } from '@gen/product';

type ProductListQueries = Awaited<RouteProps['searchParams']> & {
    category: string
};

export async function getProduct(id: ProductPublic['id']): Promise<ProductPublic> {
    return (await serverAPI.get<ProductPublic>(`/product/${id}`)).data;
}

export async function getProductList(searchParams: ProductListQueries): Promise<PaginationModel<ProductCardPublic>> {
    const res = await serverAPI.get<PaginationModel<ProductCardPublic>>(
        '/product/list',
        {
            params: { ...searchParams },
        },
    );

    return res.data;
}
