import { ISearchResult } from '@interfaces/SearchResult';
import { PaginationDTO } from '@dto/Pagination';
import { ICreatePagintaion, IPagination } from '@interfaces/Pagination';

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
