import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';
import { QueriesCommonI } from '@interfaces/Queries';

@Injectable()
export default class HistoryProductPublicService extends HistoryService {
    public async getHistoryList(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<ProductPreviewPublicI[]> {
        const res = await this.historyRepo.find({
            where: { sid },
            order: { created_at: 'DESC' },
            relations: { product: { images: true } },
            take: this.historyLength,
        });

        return res.map(({ product }) => new ProductPreviewPublic(product, searchParams.lang));
    }

    public async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
