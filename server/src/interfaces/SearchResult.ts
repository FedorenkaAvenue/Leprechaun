import { IProduct } from '@interfaces/Product';
import { IPagination } from '@interfaces/Pagination';

export interface ISearchResult<TResultItem = IProduct> {
    pagination: IPagination
    data: Array<TResultItem>
}
