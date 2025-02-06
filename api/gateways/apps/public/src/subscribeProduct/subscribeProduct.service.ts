import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { SubscribeProductStatusDTO } from "./subscribeProduct.dto";
import { ProductStatusSubscriptionI } from "./subscribeProduct.interface";
import SubscribeProductEntity from '@core/subscribeProduct/subscribeProduct.entity';
import { SessionI } from "@core/session/session.interface";
import { SubscribeProductI } from "@core/subscribeProduct/subscribeProduct.interface";
import { QueriesCommonI } from "@core/queries/queries.interface";

@Injectable()
export default class SubscribeProductService {
    constructor(
        @InjectRepository(SubscribeProductEntity) private readonly subscribeProductRepo: Repository<SubscribeProductEntity>,
    ) { }

    public async getProductStatusSubscriptions(sid: SessionI['sid']): Promise<ProductStatusSubscriptionI[]> {
        const subscriptions = await this.subscribeProductRepo.find(
            {
                where: { sid },
                relations: { product: true },
            });

        return subscriptions.map(({ product: { id } }) => id);
    }

    public async subscribeProductStatus(
        { productId, email }: SubscribeProductStatusDTO, sid: SessionI['sid'], { lang }: QueriesCommonI,
    ): Promise<void> {
        const { raw } = await this.subscribeProductRepo.upsert(
            { product: productId, email, sid, lang } as DeepPartial<SubscribeProductI>,
            {
                conflictPaths: { product: true, email: true },
                skipUpdateIfNoValuesChanged: true,
            },
        )

        if (raw.length === 0) throw new NotAcceptableException('this email already subscribed on this product');
    }
}
