import { ICreatePagintaion, IPagination } from "@interface/Pagination";

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
