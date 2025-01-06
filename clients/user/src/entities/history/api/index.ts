'use server'

import serverAPI from "@shared/api/serverApi";
import { ProductHistoryModel } from "../model/interfaces";

export async function getProductHistory(): Promise<ProductHistoryModel> {
    return (await serverAPI.get<ProductHistoryModel>('/history/product')).data;
}
