'use server'

import serverAPI from "@shared/api/serverApi";
import { SubscribeProductStatusDTO } from "./dto";

export async function subscribeProductStatus(data: SubscribeProductStatusDTO): Promise<void> {
    return (await serverAPI.post('/subscription', data)).data;
}
