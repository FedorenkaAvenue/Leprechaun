import { ProductI } from './Product';

export interface SessionI {
    id?: string;
    ip?: string;
    url?: string;
    productHistory?: Array<ProductI['id']>;
}
