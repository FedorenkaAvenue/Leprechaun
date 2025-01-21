import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { HistoryEntity } from '@entities/History';
import { SessionI } from '@interfaces/Session';
import ConfigService from '@services/Config';
import { ProductI } from '@interfaces/Product';

@Injectable()
export default class HistoryService {
    private readonly historyLength: number;

    constructor(
        @InjectRepository(HistoryEntity) public readonly historyRepo: Repository<HistoryEntity>,
        private readonly configService: ConfigService,
    ) {
        this.historyLength = Number(this.configService.getVal('USER_HISTORY_LENGTH'));
    }

    public async addHistoryItem(productId: ProductI['id'], sid: SessionI['sid']): Promise<void> {
        await this.historyRepo.upsert(
            { product: productId, sid } as DeepPartial<HistoryEntity>,
            {
                conflictPaths: { product: true, sid: true },
            },
        )
    }

    public async getHistoryListBySID(sid: SessionI['sid']): Promise<HistoryEntity[]> {
        return await this.historyRepo.find({
            where: { sid },
            order: { created_at: 'DESC' },
            relations: { product: { images: true } },
            take: this.historyLength,
        });
    }
}
