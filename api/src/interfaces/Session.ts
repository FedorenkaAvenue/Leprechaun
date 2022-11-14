import { ProductI } from './Product';

export interface SessionI {
    id?: string;
    history: Array<ProductI['id']>;
}
