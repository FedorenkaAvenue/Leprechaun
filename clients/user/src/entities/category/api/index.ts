'use server'

import { CategoryModel } from '../model/interfaces';
import serverAPI from '@shared/api/serverApi';

export async function getCategoryList(): Promise<CategoryModel[]> {
    return (await serverAPI.get<CategoryModel[]>('/category/list')).data;
}

export async function getCategory(categoryUR: CategoryModel['url']): Promise<CategoryModel> {
    return (await serverAPI.get<CategoryModel>(`/category/${categoryUR}`)).data;
}
