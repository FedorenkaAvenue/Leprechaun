export class PaginationDto {
    constructor(
      public readonly totalCount: number,
      public readonly pageCount: number,
      public readonly currentPage: number,
    ) {
    }
  }