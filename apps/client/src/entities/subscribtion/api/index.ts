'use server'

import { ProductPublic } from "@gen/product";
import serverAPI from "@shared/api/serverApi";

export async function getProductStatusSubscriptions(): Promise<ProductPublic['id'][]> {
    return (await serverAPI.get<ProductPublic['id'][]>('/subscription')).data;
}
