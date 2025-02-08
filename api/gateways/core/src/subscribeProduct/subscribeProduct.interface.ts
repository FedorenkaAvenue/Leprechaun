import { ProductI } from "../product/product.interface";
import { SessionI } from "../session/session.interface";
import { LanguagesI } from "../trans/trans.interface";

export interface SubscribeProductI {
    id: string
    sid: SessionI['sid']
    email: string
    product: ProductI
    lang: keyof LanguagesI;
}
