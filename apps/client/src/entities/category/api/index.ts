'use server'

import { cache } from 'react';

import serverAPI from '@shared/api/serverApi';
import { CategoryPreviewPublic } from '@gen/_category_preview';
import { CategoryPublic } from '@gen/category';

export async function getCategoryList(): Promise<CategoryPreviewPublic[]> {
    return (await serverAPI.get<CategoryPreviewPublic[]>('/category/list')).data;
}

export async function getCategory(categoryId: CategoryPublic['id']): Promise<CategoryPublic> {
    return (await serverAPI.get<CategoryPublic>(`/category/${categoryId}`)).data;
}

export const getCategoryCached = cache(getCategory);
export const getCategoryListCached = cache(getCategoryList);
