import { ISearchQeuries, ISearchReqQueries } from "@interface/Queries";

export class SearchQueriesDTO implements ISearchQeuries {
    page: number
    filters: Array<number> | null

    constructor({ page, filters }: ISearchReqQueries) {
        this.page = Number(page) || 1;
        this.filters = filters ? filters.split(';').map(filter => Number(filter)) : null;
    }
}
