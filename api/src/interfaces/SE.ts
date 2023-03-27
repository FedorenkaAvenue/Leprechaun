import { CategoryI } from "./Category";
import { ProductI } from "./Product";

export interface SEProductI {
    id: ProductI['id']
    title: ProductI['title']
    description: ProductI['description']
}

export interface SECategoryI {
    id: CategoryI['id']
    title: CategoryI['title']
}
