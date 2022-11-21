import { CreatePagintaionI, PaginationI } from '@interfaces/Pagination';
import { PaginationDTO, PaginationResultDTO } from '.';

/**
 * @description pagination data result
 * @param pageCount page's length amount
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class Pagination extends PaginationDTO {
    constructor({ totalCount, currentPage, itemPortion }: CreatePagintaionI) {
        super();
        this.currentPage = Number(currentPage);
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / itemPortion);
    }
}

/**
 * @description create pagination result
 * @param paginationDTO paginationDTO options
 * @param result array of result
 */
export class PaginationResult<TData> extends PaginationResultDTO<TData> {
    pagination: PaginationI;
    data: TData[];

    constructor(data: TData[], paginationDTO: CreatePagintaionI) {
        super();
        this.data = data;
        this.pagination = new Pagination(paginationDTO);
    }
}
