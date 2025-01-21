import { ProductI } from "./Product";
import { SessionI } from "./Session";

export interface SubscribeProductI {
    id: string
    sid: SessionI['sid']
    email: string
    product: ProductI
}

export type ProductStatusSubscriptionI = ProductI['id'];
