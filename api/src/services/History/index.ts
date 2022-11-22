import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { HistoryEntity } from '@entities/History';
import { SessionI } from '@interfaces/Session';
import { ProductI } from '@interfaces/Product';

@Injectable()
export default class HistoryService {
    constructor(@InjectRepository(HistoryEntity) public readonly historyRepo: Repository<HistoryEntity>) {}

    async addHistoryItem(productId: ProductI['id'], sid: SessionI['sid']): Promise<void> {
        const existedItem = await this.historyRepo.findOneBy({
            product: { id: productId },
            sid,
        });

        // TODO refactoring
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
    }

    async getHistoryList(sid: SessionI['sid']): Promise<HistoryEntity[]> {
        return await this.historyRepo.find({
            where: { sid },
            order: { created_at: 'DESC' },
        });
    }
}
