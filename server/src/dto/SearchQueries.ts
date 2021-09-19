import { ISearchQeuries, ISearchReqQueries } from "@interface/Queries";

/**
 * @description rebuild url queries to object
 * @param page page number
 * @param filters selected filters as string
 */
export class SearchQueriesDTO implements ISearchQeuries {
    page: number
    filters: Array<number> | null

    constructor({ page, filters }: ISearchReqQueries) {
        this.page = Number(page) || 1;
        this.filters = filters ? filters.split(';').map(filter => Number(filter)) : null;
    }
}
