import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { HistoryEntity } from '@entities/History';
import { SessionI } from '@interfaces/Session';
import { ProductI } from '@interfaces/Product';
import configService from '@services/Config';

const USER_HISTORY_LENGTH = Number(configService.getVal('USER_HISTORY_LENGTH'));

@Injectable()
export default class HistoryService {
    constructor(@InjectRepository(HistoryEntity) public readonly historyRepo: Repository<HistoryEntity>) {}

    async addHistoryItem(productId: ProductI['id'], sid: SessionI['sid']): Promise<void> {
        // TODO refactoring
        const existedItem = await this.historyRepo.findOneBy({
            product: { id: productId },
            sid,
        });

        if (!existedItem) {
            await this.historyRepo.save({
                sid,
                product: productId,
            } as DeepPartial<HistoryEntity>);
        } else {
            await this.historyRepo.update(
                {
                    sid,
                    product: { id: productId },
                },
                {},
            );
        }

        // check if history length is full
    }

    async getHistoryListBySID(sid: SessionI['sid']): Promise<HistoryEntity[]> {
        return await this.historyRepo.find({
            where: { sid },
            order: { created_at: 'DESC' },
            relations: ['product'],
            take: USER_HISTORY_LENGTH,
        });
    }
}
