import { ProductPreviewPublicI } from "../product/product.interface";
import { ProductI } from "@core/product/product.interface";
import { SessionI } from "@core/session/session.interface";

interface HistoryProductBaseI<P> {
    id?: string;
    sid: SessionI['sid'];
    product: P;
    created_at: Date;
}

export type HistoryProductI = HistoryProductBaseI<ProductI>;
export type HistoryProductPublicI = HistoryProductBaseI<ProductPreviewPublicI>;
