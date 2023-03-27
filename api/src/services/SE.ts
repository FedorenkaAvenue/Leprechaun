import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { AggregationsAggregate, IndicesCreateRequest, SearchResponse } from "@elastic/elasticsearch/lib/api/types";

import { SEIndexesE } from "@enums/SE";
import { SE_CATEGORY_PROPERTIES, SE_PRODUCT_PROPERTIES } from "@constants/SE";

@Injectable()
export class SEService {
    constructor(private readonly SEService: ElasticsearchService) { }

    /**
     * @description search by substring
     * @param substring searchible substring
     * @param index SE index name
     */
    public async textSearch<TDocument>(substring: string, index: SEIndexesE): Promise<SearchResponse<TDocument, Record<string, AggregationsAggregate>>> {
        return await this.SEService.search<TDocument>({
            index,
            body: {
                query: {
                    multi_match: {
                        query: substring,
                    }
                }
            }
        });
    }

    /**
     * @description create SE document
     * @param index SE index
     * @param document document body
     */
    public async createDoc<T>(index: SEIndexesE, document: T): Promise<void> {
        try {
            await this.SEService.index({ index, document });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description create SE index
     * @param data index init data
     */
    private async createIndex(data: IndicesCreateRequest): Promise<void> {
        try {
            const isExist = await this.SEService.indices.exists({ index: data.index });

            if (!isExist) await this.SEService.indices.create({ ...data });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description init SE indexes
     */
    public async initSE(): Promise<void> {
        await Promise.all([
            this.createIndex({
                index: SEIndexesE.PRODUCT,
                mappings: {
                    properties: SE_PRODUCT_PROPERTIES,
                },
            }),
            this.createIndex({
                index: SEIndexesE.CATEGORY,
                mappings: {
                    properties: SE_CATEGORY_PROPERTIES,
                }
            }),
        ]);
    }
}
