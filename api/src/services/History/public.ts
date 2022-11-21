import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import HistoryService from '.';
import { SessionI } from '@interfaces/Session';
import { ProductPublic } from '@dto/Product/constructor';
// import configService from '@services/Config';

// const USER_HISTORY_LENGTH = configService.getVal('USER_HISTORY_LENGTH');

@Injectable()
export default class HistoryPublicService extends HistoryService {
    async getHistoryPublicList(sid: SessionI['sid']): Promise<ProductPublic[]> {
        const res = await this.getHistoryList(sid);

        return res.map(({ product }) => new ProductPublic(product));
    }

    async clearHistoryPublicList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
