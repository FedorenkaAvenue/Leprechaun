'use server'

import serverAPI from "@shared/api/serverApi";
import { ProductStatusSubscriptionModel } from "../model/interfaces";

export async function getProductStatusSubscriptions(): Promise<ProductStatusSubscriptionModel[]> {
    return (await serverAPI.get<ProductStatusSubscriptionModel[]>('/subscribe/product')).data;
}
