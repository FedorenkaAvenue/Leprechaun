import { ICreatePagintaion, IPagination, IPaginationResult } from '@interfaces/Pagination';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description pagination data result
 * @param pageCount page's length amount
 * @param currentPage current active page
 * @param totalCount all items count
 */
export class PaginationDTO implements IPagination {
    @ApiProperty({ description: 'current selected page' })
    currentPage: number;

    @ApiProperty({ description: 'summary items amount' })
    totalCount: number;

    @ApiProperty({ description: 'pages amoun' })
    pageCount: number;

    constructor({ totalCount, currentPage, itemPortion }: ICreatePagintaion) {
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
 export class PaginationResultDTO<TData> implements IPaginationResult<any> {
    pagination: IPagination;
    data: Array<TData>;

    constructor(data: Array<TData>, paginationDTO: ICreatePagintaion) {
        this.pagination = new PaginationDTO(paginationDTO);
        this.data = data;
    }
}
