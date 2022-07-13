import { ICreatePagintaion, IPagination } from '@interfaces/Pagination';
import { PaginationDTO, PaginationResultDTO } from '.';

/**
 * @description pagination data result
 * @param pageCount page's length amount
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class Pagination extends PaginationDTO {
    constructor({ totalCount, currentPage, itemPortion }: ICreatePagintaion) {
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
    pagination: IPagination;
    data: Array<TData>;

    constructor(data: Array<TData>, paginationDTO: ICreatePagintaion) {
        super();
        this.data = data;
        this.pagination = new Pagination(paginationDTO);
    }
}
