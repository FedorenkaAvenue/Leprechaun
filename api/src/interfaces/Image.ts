import { ProductI } from '@interfaces/Product';

export interface ImageI {
    id?: string;
    src: string;
    product_id: ProductI['id'];
}
