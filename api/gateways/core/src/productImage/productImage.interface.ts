import { ProductI } from "../product/product.interface";

export interface ProductImageI {
    id: string;
    src: string;
    src_id: string;
    product_id: ProductI['id'];
    is_main: boolean
}
