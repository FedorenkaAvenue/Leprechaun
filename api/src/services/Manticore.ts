import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UtilsApi, ApiClient } from 'manticoresearch';

import configService from './Config';

export interface IManticoreResult<TIndexItem> {
    columns: any;
    data: Array<TIndexItem>;
    total: number;
    error: string;
    warning: string;
}

/**
 * @description Manticore search engine service
 */
@Injectable()
export default class ManticoreService {
    /**
     * @description create Manticore client
     * @returns Manticore client
     */
    createConnection() {
        const client = new ApiClient();
        client.basePath = configService.getManticoreConfig();

        return client;
    }

    /**
     * @description create search API connection
     * @param client Manticore API client
     * @returns search API connection
     */
    createSearchClient() {
        return new UtilsApi(this.createConnection());
    }

    /**
     * @description Manticore search by query
     * @param indexTable index name
     * @param searchExp searched substring
     */
    async searchByQuery(indexTable: string, searchExp: string): Promise<any[]> {
        try {
            const res = (await this.createSearchClient().sql(
                `mode=raw&query=
                    SELECT *
                    FROM ${indexTable}
                    WHERE match('${searchExp}')
                    LIMIT ${10} OFFSET ${0}
                `,
            )) as IManticoreResult<any>;

            return res.data;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
