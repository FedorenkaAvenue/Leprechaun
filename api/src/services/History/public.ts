import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { QueriesCommon } from '@dto/Queries';
import { ProductPreviewPublicI } from '@interfaces/Product';
import { ProductPreviewPublic } from '@dto/Product/public';

@Injectable()
export default class HistoryPublicService extends HistoryService {
    public async getHistoryList(sid: SessionI['sid'], searchParams: QueriesCommon): Promise<ProductPreviewPublicI[]> {
        const res = await this.getHistoryListBySID(sid);

        return res.map(({ product }) => new ProductPreviewPublic(product, searchParams.lang));
    }

    public async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
