import { CategoryPublicI } from './Category';
import { ProductPreviewI } from './Product';

export interface SearchResI<T> {
    total: number
    hits: T[]
};

export interface SearchAutocompleteI {
    total: number;
    products: ProductPreviewI[];
    categories: CategoryPublicI[];
}
