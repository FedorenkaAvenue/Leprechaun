import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { ProductCard } from '@dto/Product/constructor';
import { QueriesProductT } from '@interfaces/Queries';

@Injectable()
export default class HistoryPublicService extends HistoryService {
    async getHistoryList(sid: SessionI['sid'], searchParams: QueriesProductT): Promise<ProductCard[]> {
        const res = await this.getHistoryListBySID(sid);

        return res.map(({ product }) => new ProductCard(product, searchParams));
    }

    async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
