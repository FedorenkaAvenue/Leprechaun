import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UtilsApi, ApiClient } from 'manticoresearch';

import ConfigService from './Config';
import { ProductIndexDTO } from '@dto/Manticore';
import { IProductIndexItem } from '@interfaces/Manticore';
import { IProduct } from '@interfaces/Product';

export interface IManticoreResult<TIndexItem> {
    columns: any
    data: Array<TIndexItem>
    total: number
    error: string
    warning: string
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
        return new UtilsApi(this.createConnection());
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
            const res = await this.createSearchClient().sql(
                `mode=raw&query=
                    SELECT *
                    FROM ${indexTable}
                    WHERE match('${searchExp}')
                    LIMIT ${10} OFFSET ${0}
                `
            ) as IManticoreResult<any>;

            console.log(res);
            
            return res.data;
        } catch(err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
