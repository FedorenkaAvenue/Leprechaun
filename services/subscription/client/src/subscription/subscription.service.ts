import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { from, map, Observable } from "rxjs";

import SubscriptionEntity from "./subscription.entity";
import { User } from "gen/user";
import { Subscription } from "gen/subscription";

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity) private readonly subscriptionRepo: Repository<SubscriptionEntity>,
    ) { }

    public getSubscriptionListPublic(user: User['id']): Observable<Subscription['product'][]> {
        return from(this.subscriptionRepo.findBy({ user })).pipe(
            map(subscriptions => subscriptions.map(subscription => subscription.product)),
        );
    }

    // public async subscribeProductStatus(
    //     { productId, email }: SubscribeProductStatusDTO, sid: SessionI['sid'], { lang }: QueriesCommonI,
    // ): Observable<void> {
    //     const { raw } = await this.subscriptionRepo.upsert(
    //         { product: productId, email, sid, lang } as DeepPartial<SubscribeProductI>,
    //         {
    //             conflictPaths: { product: true, email: true },
    //             skipUpdateIfNoValuesChanged: true,
    //         },
    //     )

    //     if (raw.length === 0) throw new NotAcceptableException('this email already subscribed on this product');
    // }
}
