import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { ProductLightCard } from '@dto/Product/constructor';
import { QueriesCommon } from '@dto/Queries/constructor';

@Injectable()
export default class HistoryPublicService extends HistoryService {
    public async getHistoryList(sid: SessionI['sid'], searchParams: QueriesCommon): Promise<ProductLightCard[]> {
        const res = await this.getHistoryListBySID(sid);

        return res.map(({ product }) => new ProductLightCard(product, searchParams));
    }

    public async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
