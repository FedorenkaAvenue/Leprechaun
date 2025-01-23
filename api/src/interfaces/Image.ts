import { ProductI } from "./Product";

export interface ImageI {
    id: string;
    src: string;
    product_id: ProductI['id'];
    is_main: boolean
}
