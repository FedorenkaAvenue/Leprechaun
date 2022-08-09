import { IPagination, IPaginationResult } from '@interfaces/Pagination';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO implements IPagination {
    @ApiProperty({ description: 'current selected page' })
    currentPage: number;

    @ApiProperty({ description: 'summary items amount' })
    totalCount: number;

    @ApiProperty({ description: 'pages amoun' })
    pageCount: number;
}

export class PaginationResultDTO<TData> implements IPaginationResult<any> {
    pagination: IPagination;
    data: Array<TData>;
}
