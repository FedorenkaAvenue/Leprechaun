import { ApiProperty } from '@nestjs/swagger';

import { CreatePagintaionI, PaginationI, PaginationIResultI } from '@interfaces/Pagination';

/**
 * @description pagination data result
 * @param pageCount page's length amount (0 if totalCount in 0)
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class Pagination implements PaginationI {
    @ApiProperty({ description: 'current selected page' })
    currentPage: number;

    @ApiProperty({ description: 'summary items amount' })
    totalCount: number;

    @ApiProperty({ description: 'pages amoun' })
    pageCount: number;

    constructor({ totalCount, currentPage, itemPortion }: CreatePagintaionI) {
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
export class PaginationResult<TData> implements PaginationIResultI<any> {
    pagination: PaginationI;
    data: TData[];

    constructor(data: TData[], paginationDTO: CreatePagintaionI) {
        this.data = data;
        this.pagination = new Pagination(paginationDTO);
    }
}
