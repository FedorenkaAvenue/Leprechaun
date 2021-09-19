import { ISearchResult } from "@interface/SearchResult";
import { ICreatePagintaion, PaginationDTO } from "@dto/pagination";
import { IPagination } from "@interface/Pagination";

/**
 * @description create search result
 * @param currentPage current requested page
 * @param resultCount count of all result (without pagination)
 * @param result array of result
 */
export class SearchResultDTO implements ISearchResult {
    pagination: IPagination
    data: Array<any>

    constructor(data: any, paginationDTO: ICreatePagintaion) {
        this.pagination = new PaginationDTO(paginationDTO);
        this.data = data;
    }
}
