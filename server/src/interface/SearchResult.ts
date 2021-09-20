import { IProduct } from "@modules/product/index.interface";
import { IPagination } from "@interface/Pagination";

export interface ISearchResult<TResultItem = IProduct> {
    pagination: IPagination
    data: Array<TResultItem>
}
