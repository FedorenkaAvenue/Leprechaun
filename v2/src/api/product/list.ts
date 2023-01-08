import { PaginationSchemaResultSchema } from '@schemas/Pagination';
import ProductCardSchema from '@schemas/ProductCard';

export type Model = PaginationSchemaResultSchema<ProductCardSchema>;

export default async function getProducts(): Promise<Model> {
    const res = await fetch('http://leprechaun_api/product/list');

    return res.json();
}
