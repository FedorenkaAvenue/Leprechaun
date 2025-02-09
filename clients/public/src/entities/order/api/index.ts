'use server';

import { CartModel } from '../model/interfaces';
import serverAPI from '@shared/api/serverApi';

export async function getCart(): Promise<CartModel | null> {
    const { data } = await serverAPI.get<CartModel>('/order');

    return typeof data === 'string' ? null : data;
}
