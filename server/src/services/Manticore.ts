import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchApi, ApiClient } from 'manticoresearch';

import ConfigService from './Config';

// custom manticoresearch library types
// interface IManticoreResult<TItem> {
//     took: number
//     timed_out: number
//     hits: IManticoreResultItems<TItem>
// }

// interface IManticoreResultItems<TItem> {
//     total: number
//     hits: Array<IManticoreItem<TItem>>
// }

// interface IManticoreItem<TItem> {
//     _id: number
//     _score: number
//     _source: Array<TItem>
// }

// export interface ISearchResult<TItem> {
//     total: number
//     res: Array<TItem>
// }

@Injectable()
export default class ManticoreService {
    /**
     * @description create Manticore client
     * @returns Manticore client
     */
    createConnection() {
        const client = new ApiClient();

        client.basePath = new ConfigService().getManticoreConfig();

        return client;
    }

    /**
     * @description create search API connection
     * @param client Manticore API client
     * @returns search API connection
     */
    createSearchClient() {
        return new SearchApi(this.createConnection());
    }

    /**
     * @description Manticore search by query
     * @param indexTable index name
     * @param searchExp searched substring
     */
    async searchByQuery(indexTable: string, searchExp: string) {
        try {
            const { hits: { total, hits } } = await this.createSearchClient().search(
                JSON.stringify({
                    index: indexTable,
                    query: {
                        query_string: searchExp,
                        // match_all: {},
                        // bool: {
                        //     must: [
                        //         {
                        //             equals: { product_id: 123 }
                        //         },
                        //         {
                        //             in: {
                        //                 property_id: [ 1, 3, 7 ]
                        //             }
                        //         }
                        //     ]
                        // }
                    },
                    sort: [
                        // { rating: 'desc'}
                    ]
                })
            );
            
            return ({
                total,
                res: hits
            });
        } catch(err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
