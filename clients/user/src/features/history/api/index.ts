'use server'

import serverAPI from '@shared/api/serverApi';

export async function clearProductHistory() {
    return (await serverAPI.delete('/history/product')).data;
}
