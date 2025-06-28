import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from 'typeorm';
import { from, map, Observable } from "rxjs";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import SubscriptionEntity from "./subscription.entity";
import { User } from "gen/user";
import { Subscription } from "gen/subscription";
import { SubscriptionProductStatusDTO } from "./subscription.dto";
import { TransData } from "gen/trans";
import { Product } from "gen/product";

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

    public subscribeProductStatus({ queries, ...updates }: SubscriptionProductStatusDTO): Observable<void> {
        return from(this.subscriptionRepo.upsert(
            { lang: queries.lang as keyof TransData, ...updates },
            {
                conflictPaths: { product: true, email: true },
                skipUpdateIfNoValuesChanged: true,
            },
        )).pipe(
            map(({ raw }) => {
                if (raw.length === 0) throw new RpcException({
                    status: status.ALREADY_EXISTS,
                    message: 'this email already subscribed on this product',
                });
            }),
        );
    }

    // for deleted product event
    public async deleteSubscriptionByProductId(product: Product['id']): Promise<DeleteResult> {
        return await this.subscriptionRepo.delete({ product });
    }
}
