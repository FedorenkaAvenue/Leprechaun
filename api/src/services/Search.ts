import { BadRequestException, Injectable } from '@nestjs/common';

import configService from './Config';
import { SearchItem } from '@dto/Search/constructor';
// import { SearchItemE } from '@enums/Search';

@Injectable()
export default class SearchService {
    private api: any;

    constructor() {
        this.api = configService.getSEConfig();
    }

    async autocomplete(substring: string): Promise<SearchItem[]> {
        const body = {
            index: 'products',
            query: {
                query_string: `@* ${substring}`,
            },
            // highlight: {
            //     fields: []
            // },
            limit: 10,
            maxMatches: 10,
        };

        try {
            return await this.api.search(JSON.stringify(body));

            // return res.hits.hits.map(item => new SearchItem({ type: SearchItemE.PRODUCT , item }));
        } catch (err) {
            console.log(err.response.text);
            throw new BadRequestException(err.response.text);
        }
    }
}
