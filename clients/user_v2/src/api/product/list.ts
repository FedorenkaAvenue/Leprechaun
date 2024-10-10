import { PaginationSchemaResultSchema } from '@schemas/Pagination';
import ProductCardSchema from '@schemas/ProductCard';
import { appRequest } from '..';

export type Model = PaginationSchemaResultSchema<ProductCardSchema>;

export default async function getProducts(): Promise<Model> {
   return appRequest<Model>('product/list');
}
