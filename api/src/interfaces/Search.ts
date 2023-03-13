import { CategoryI, CategorySearchI } from './Category';
import { ProductSearchI } from './Product';

export interface SearchAutocompleteI {
    total: number;
    products: ProductSearchI[];
    categories: CategorySearchI[];
}
