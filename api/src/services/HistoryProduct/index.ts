import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { SessionI } from '@interfaces/Session';
import ConfigService from '@services/Config';
import { ProductI } from '@interfaces/Product';
import { HistoryProductEntity } from '@entities/HistoryProduct';
import { HistoryProductI } from '@interfaces/HistoryProduct';

@Injectable()
export default class HistoryProductService {
    protected readonly historyLength: number;

    constructor(
        @InjectRepository(HistoryProductEntity) public readonly historyRepo: Repository<HistoryProductEntity>,
        private readonly configService: ConfigService,
    ) {
        this.historyLength = Number(this.configService.getVal('USER_HISTORY_LENGTH'));
    }

    public async addHistoryProductItem(productId: ProductI['id'], sid: SessionI['sid']): Promise<void> {
        await this.historyRepo.upsert(
            { product: productId, sid } as DeepPartial<HistoryProductI>,
            {
                conflictPaths: { product: true, sid: true },
            },
        )
    }
}
