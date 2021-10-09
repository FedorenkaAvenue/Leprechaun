import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchApi, ApiClient } from 'manticoresearch';

import ConfigService from './Config';
import { ProductIndexDTO } from '@dto/Manticore';
import { IProductIndexItem } from '@interfaces/Manticore';
import { IProduct } from '@interfaces/Product';

export interface IManticoreResult {
    took: number
    timed_out: number
    hits: IManticoreHitsItems
}

export interface IManticoreHitsItems {
    total: number
    hits: Array<IManticoreItem>
}

export interface IManticoreItem {
    _id: number
    _score: number
    _source: any
}

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
     * @description search and map product index search result to completed products
     * @param searchSubstr searching sub string
     * @returns array of completed products
     */
    async searchProduct(searchSubstr: string): Promise<IProduct[]> {
        const res =  await this.searchByQuery('products', searchSubstr) as Array<IProductIndexItem>;
        const mapedRes = {};

        res.forEach(product => {
            const mapedProduct = new ProductIndexDTO(product);
            const { id } = mapedProduct;

            if (mapedRes[id]) {
                const currentProduct = mapedRes[id] as IProduct;

                mapedRes[id] = {
                    ...currentProduct,
                    labels: currentProduct.labels.some(label => label.id === mapedProduct.labels[0].id) ?
                        currentProduct.labels :
                        [ ...currentProduct.labels, ...mapedProduct.labels ],
                    properties: currentProduct.properties.some(prop => prop.id === mapedProduct.properties[0].id) ?
                        currentProduct.properties :
                        [ ...currentProduct.properties, ...mapedProduct.properties ],
                    images: currentProduct.images.some(img => img.id === mapedProduct.images[0].id) ?
                        currentProduct.images :
                        [ ...currentProduct.images, ...mapedProduct.images ]
                };
            } else {
                mapedRes[id] = new ProductIndexDTO(product);
            }
        });

        return Object.values(mapedRes);
    }

    /**
     * @description Manticore search by query
     * @param indexTable index name
     * @param searchExp searched substring
     */
    async searchByQuery(indexTable: string, searchExp: string): Promise<any[]> {
        try {
            const res = await this.createSearchClient().search(
                JSON.stringify({
                    index: indexTable,
                    query: {
                        query_string: searchExp,
                        // match_all: {},
                        // bool: {
                        //     must: [
                        //         { equals: { product_id: 123 } },
                        //         { in: { property_id: [ 1, 3, 7 ] } }
                        //     ]
                        // }
                    },
                    sort: [
                        { rating: 'desc'}
                    ]
                })
            ) as IManticoreResult;

            if (res.timed_out) throw new InternalServerErrorException('pizda, Manticore time out');
            
            return res.hits.hits.map(item => ({
                ...item._source,
                id: Number(item._id)
            }));
        } catch(err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
