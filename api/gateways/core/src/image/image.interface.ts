import { ProductI } from "../product/product.interface";

export interface ImageI {
    id: string;
    src: string;
    product_id: ProductI['id'];
    is_main: boolean
}
