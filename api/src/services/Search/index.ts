import { Injectable } from '@nestjs/common';

import configService from '@services/Config';
import { SearchIndexT } from '@type/Search';

@Injectable()
export default class SearchService {
    protected readonly api: any;

    constructor() {
        this.api = configService.getSEConnectionData();
    }

    /**
     * @description create body request for SE API
     * @param index index table
     * @param searchSubstring search string
     * @returns body
     */
    getReqBody(index: SearchIndexT, searchSubstring: string) {
        return {
            index,
            query: {
                query_string: `@* ${searchSubstring}`,
            },
            // highlight: {
            //     fields: [ "title" ]
            // },
            limit: 5,
            maxMatches: 5,
        };
    }

    /**
     * @description search products by substring
     * @param substring search
     */
    async searchProduct(substring: string) {
        return await this.api.search(JSON.stringify(this.getReqBody('products', substring)));
    }

    /**
     * @description search categories by substring
     * @param substring search
     */
    async searchCategory(substring: string) {
        return await this.api.search(JSON.stringify(this.getReqBody('categories', substring)));
    }
}
