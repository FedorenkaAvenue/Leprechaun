import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { IndicesCreateRequest } from "@elastic/elasticsearch/lib/api/types";

import { SEIndexesE } from "@enums/SE";
import { SE_CATEGORY_PROPERTIES, SE_PRODUCT_PROPERTIES } from "@constants/SE";
import configService from "./Config";

@Injectable()
export class SEService {
    constructor(public readonly SE: ElasticsearchService) { }

    /**
     * @description create SE index
     * @param data index init data
     */
    private async createIndex(data: IndicesCreateRequest): Promise<void> {
        try {
            const isExist = await this.SE.indices.exists({ index: data.index });

            if (!isExist) {
                this.SE.indices.create({ ...data });

                return;
            }

            if (configService.isDev) {
                // this.SE.reindex({
                //     source: { index: data.index },
                //     dest: { index: data.index, version_type: 'force' }
                // });
            }
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
