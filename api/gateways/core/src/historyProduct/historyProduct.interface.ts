import { ProductI } from "../product/product.interface";
import { SessionI } from "../session/session.interface";

export interface HistoryProductI<P = ProductI> {
    id?: string;
    sid: SessionI['sid'];
    product: P;
    created_at: Date;
}
