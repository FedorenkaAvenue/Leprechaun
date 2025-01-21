'use server'

import { ProductOverviewModel } from '../model/interfaces';
import serverAPI from '@shared/api/serverApi';

export async function getProduct(id: ProductOverviewModel['id']): Promise<ProductOverviewModel> {
    return (await serverAPI.get<ProductOverviewModel>(`/product/${id}`)).data;
}
