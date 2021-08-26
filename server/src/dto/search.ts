import { IPaginationOptions, ISearchResult } from "@interface/search";

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
 * @description create search result
 * @param currentPage current requested page
 * @param resultCount count of all result (without pagination)
 * @param result array of result
 */
export class SearchResult implements ISearchResult {
    currentPage: number
    resultCount: number
    result: any

    constructor(currentPage: number, resultCount: number, result: any) {
        this.currentPage = currentPage;
        this.resultCount = resultCount;
        this.result = result;
    }
}
