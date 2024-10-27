import { CategoryPublicI } from './Category';
import { ProductPreviewPublicI } from './Product';

export interface SearchResI<T> {
    total: number
    hits: T[]
};

export interface SearchAutocompleteI {
    total: number;
    products: ProductPreviewPublicI[];
    categories: CategoryPublicI[];
}
