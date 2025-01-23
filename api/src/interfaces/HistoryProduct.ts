import { ProductI, ProductPreviewPublicI } from '@interfaces/Product';
import { SessionI } from './Session';

interface HistoryProductBaseI<P> {
    id?: string;
    sid: SessionI['sid'];
    product: P;
    created_at: Date;
}

export type HistoryProductI = HistoryProductBaseI<ProductI>;
export type HistoryProductPublicI = HistoryProductBaseI<ProductPreviewPublicI>;
