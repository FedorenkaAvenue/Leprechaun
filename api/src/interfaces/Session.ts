import { ProductI } from './Product';

export interface SessionI {
    id?: string;
    ip?: string;
    url?: string;
    history?: Array<ProductI['id']>;
}
