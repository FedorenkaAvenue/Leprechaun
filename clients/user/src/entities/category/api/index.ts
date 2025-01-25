'use server'

import { cache } from 'react';

import { CategoryModel } from '../model/interfaces';
import serverAPI from '@shared/api/serverApi';

export async function getCategoryList(): Promise<CategoryModel[]> {
    return (await serverAPI.get<CategoryModel[]>('/category/list')).data;
}

export async function getCategory(categoryId: CategoryModel['id']): Promise<CategoryModel> {
    return (await serverAPI.get<CategoryModel>(`/category/${categoryId}`)).data;
}

export const getCategoryCached = cache(getCategory);
export const getCategoryListCached = cache(getCategoryList);
