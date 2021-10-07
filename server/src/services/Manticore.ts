import { Injectable } from '@nestjs/common';
import { SearchApi, ApiClient } from 'manticoresearch';

import { IProduct } from '@interfaces/Product';
import ConfigService from './Config';

@Injectable()
export default class ManticoreService {
    /**
     * @description create Manticore daemon connection
     * @returns connector
     */
    createConnection() {
        const client = new ApiClient();

        client.basePath = new ConfigService().getManticoreConfig();

        return new SearchApi(client);
    }

    /**
     * @description build query for Manticore daemon
     * @param indexTable name of Manticore index
     * @param searchExp searched substring
     */
    async searchByQuery(indexTable: string, searchExp: string): Promise<IProduct[]> {
        const { hits } = await this.createConnection().search(
            JSON.stringify({
                index: indexTable,
                // query: {
                //     query_string: "@title \"find me fast \"/2"
                // }
                // {
                //     "index":"forum",
                //     "query":{
                //         "match_all":{},
                //         "bool": {
                //             "must": [
                //                 {
                //                     "equals":{"author_id":123}
                //                 },
                //                 {
                //                     "in":{
                //                         "forum_id": [1,3,7]
                //                     }
                //                 }
                //             ]
                //         }
                //     }
                //     ,"sort":[{"post_date":"desc"}]});
            })
        );

        return hits;
    }
}
