import { Pagination as PaginationI } from "gen/common";

interface CreatePagintaion {
    totalCount: number;
    currentPage: number;
    itemPortion: number;
}

/**
 * @description pagination data result
 * @param pageCount page's length amount (0 if totalCount in 0)
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class Pagination implements PaginationI {
    currentPage: number;
    totalCount: number;
    pageCount: number;

    constructor({ totalCount, currentPage, itemPortion }: CreatePagintaion) {
        this.currentPage = currentPage;
        this.totalCount = totalCount;
        this.pageCount = Math.ceil((totalCount || 1) / itemPortion);
    }
}

/**
 * @description create pagination result
 * @param paginationDTO paginationDTO options
 * @param result array of result
 */
export class PaginationResult<TData> {
    pagination: PaginationI;
    data: TData[];

    constructor(data: TData[], paginationDTO: CreatePagintaion) {
        this.data = data;
        this.pagination = new Pagination(paginationDTO);
    }
}
