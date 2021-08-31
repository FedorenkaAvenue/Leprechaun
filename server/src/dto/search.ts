import { IPagination, IPaginationOptions, ISearchResult } from "@interface/search";

interface ICreatePagintaion {
    totalCount: number
    currentPage: number
    itemPortion: number
}

/**
 * @description create object for pagination search
 * @param page number of page
 * @param limit item portion
 */
export class PaginationOptionsDTO implements IPaginationOptions {
    page: number;
    limit: number;

    constructor(pageNumber: number, pageItemsPortion: number) {
        this.page = pageNumber || 1;
        this.limit = pageItemsPortion || 10;
    }
}

/**
 * @description pagination data result
 * @param pageCount page's length amount
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class PaginationDTO implements IPagination {
    currentPage: number
    totalCount: number
    pageCount: number

    constructor({ totalCount, currentPage, itemPortion }: ICreatePagintaion) {
        this.currentPage = Number(currentPage);
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / itemPortion);
    }
}

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
