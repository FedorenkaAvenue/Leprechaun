import { ProductI, ProductLightCardI } from './Product';
import { SessionI } from './Session';

interface HistoryBaseI<P = ProductI> {
    id?: string;
    sid: SessionI['sid'];
    product: P;
    created_at: Date;
}

export type HistoryI = HistoryBaseI;
export type HistoryPublicI = HistoryBaseI<ProductLightCardI>;
