import { ProductI } from './Product';
import { SessionI } from './Session';

export interface HistoryI {
    id?: string;
    sid: SessionI['sid'];
    product: ProductI;
    created_at: Date;
}
