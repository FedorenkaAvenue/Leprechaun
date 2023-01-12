import { CategoryI } from './Category';
import { ProductI } from './Product';

export type SearchProductItemT = Pick<ProductI, 'id' | 'title'>;
export type SearchCategoryItemT = Pick<CategoryI, 'url' | 'title'>;

export interface SearchAutocompleteI {
    total: number;
    products: SearchProductItemT[];
    categories: SearchCategoryItemT[];
}
