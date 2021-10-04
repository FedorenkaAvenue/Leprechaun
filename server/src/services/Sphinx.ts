import { Injectable } from '@nestjs/common';
import { Sphinxql } from 'sphinxql';

import ConfigService from './Config';

@Injectable()
export default class SphinxService {
    /**
     * @description get SphinxQL connection
     * @returns connector
     */
    createConnection(): Sphinxql {
        return Sphinxql.createPoolConnection({
            ...new ConfigService().getSphinxConfig(),
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    /**
     * @description build query for SphinxQL
     * @param searchExp searched substring
     * @returns array of result
     */
    async searchByQuery(searchExp: string) {
        const { results } = await this.createConnection()
            .getQueryBuilder()
            .select('*')
            .from('products_index')
            .match('*', searchExp, false)
            .execute();

        return results;
    }
}
