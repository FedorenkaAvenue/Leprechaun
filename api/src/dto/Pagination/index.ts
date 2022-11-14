import { PaginationI, PaginationIResultI } from '@interfaces/Pagination';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO implements PaginationI {
    @ApiProperty({ description: 'current selected page' })
    currentPage: number;

    @ApiProperty({ description: 'summary items amount' })
    totalCount: number;

    @ApiProperty({ description: 'pages amoun' })
    pageCount: number;
}

export class PaginationResultDTO<TData> implements PaginationIResultI<any> {
    pagination: PaginationI;
    data: Array<TData>;
}
