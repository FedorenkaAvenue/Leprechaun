'use server'

import { HistoryPublic } from '@gen/history';
import serverAPI from '@shared/api/serverApi';

export async function getProductHistory(): Promise<HistoryPublic[]> {
    return (await serverAPI.get<HistoryPublic[]>('/history')).data;
}
