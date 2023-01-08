export interface PaginationSchema {
    currentPage: number;
    totalCount: number;
    pageCount: number;
}

export interface PaginationSchemaResultSchema<TDataResult> {
    pagination: PaginationSchema;
    data: TDataResult[];
}
