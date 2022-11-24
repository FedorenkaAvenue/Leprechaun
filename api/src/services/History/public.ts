import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { ProductCard } from '@dto/Product/constructor';

@Injectable()
export default class HistoryPublicService extends HistoryService {
    async getHistoryList(sid: SessionI['sid']): Promise<ProductCard[]> {
        const res = await this.getHistoryListBySID(sid);

        return res.map(({ product }) => new ProductCard(product));
    }

    async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
