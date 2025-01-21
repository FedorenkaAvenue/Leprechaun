import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import SubscribeProductEntity from "@entities/SubscribeProduct";
import { SubscribeProductStatusDTO } from "@dto/Subscribe/public";
import { SessionI } from "@interfaces/Session";
import { ProductStatusSubscriptionI } from "@interfaces/Subscribe";

@Injectable()
export default class SubscribePublicService {
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
        { productId, email }: SubscribeProductStatusDTO, sid: SessionI['sid'],
    ): Promise<void> {
        const { raw } = await this.subscribeProductRepo.upsert(
            { product: productId, email, sid } as DeepPartial<SubscribeProductEntity>,
            {
                conflictPaths: { product: true, email: true },
                skipUpdateIfNoValuesChanged: true,
            },
        )

        if (raw.length === 0) throw new NotAcceptableException('this email already subscribed on this product');
    }
}
