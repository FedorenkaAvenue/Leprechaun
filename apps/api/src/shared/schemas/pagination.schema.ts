import { Pagination } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationSchema implements Pagination {
    @ApiProperty({ description: 'current selected page' })
    currentPage: number;

    @ApiProperty({ description: 'summary items amount' })
    totalCount: number;

    @ApiProperty({ description: 'pages amoun' })
    pageCount: number;
}
