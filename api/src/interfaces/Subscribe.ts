import { ProductI } from "./Product";
import { SessionI } from "./Session";
import { LanguagesI } from "./Trans";

export interface SubscribeProductI {
    id: string
    sid: SessionI['sid']
    email: string
    product: ProductI
    lang: keyof LanguagesI;
}

export type ProductStatusSubscriptionI = ProductI['id'];
