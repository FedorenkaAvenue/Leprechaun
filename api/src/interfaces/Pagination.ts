export interface PaginationOptionsI {
    limit: number;
    pageNumber: number;
}

export interface PaginationI {
    currentPage: number;
    totalCount: number;
    pageCount: number;
}

export interface CreatePagintaionI {
    totalCount: number;
    currentPage: number;
    itemPortion: number;
}

export interface PaginationIResultI<TDataResult> {
    pagination: PaginationI;
    data: TDataResult[];
}
