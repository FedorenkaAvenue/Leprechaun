import { Inject, Injectable, NotAcceptableException, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";

import { User } from "@gen/user";
import { Product } from "@gen/product";
import { SUBSCRIPTION_SERVICE_NAME, SubscriptionServiceClient } from "@gen/subscription";
import { SUBSCRIPTION_PACKAGE } from "./subscription.constants";
import { catchResponceError } from "@pipes/operators";

@Injectable()
export default class SubscriptionPublicService implements OnModuleInit {
    private subscriptionClient: SubscriptionServiceClient;

    constructor(@Inject(SUBSCRIPTION_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.subscriptionClient = this.client.getService<SubscriptionServiceClient>(SUBSCRIPTION_SERVICE_NAME);
    }

    public async getSubscriptionListPublic(user: User['id']): Promise<Product['id'][]> {
        return lastValueFrom(this.subscriptionClient.getSubscriptionListPublic({ user }).pipe(
            map(res => res.items),
            catchResponceError,
        ));
    }

    // public async subscribeProductStatus(
    //     { productId, email }: SubscribeProductStatusDTO, sid: SessionI['sid'], { lang }: QueriesCommonI,
    // ): Promise<void> {
    //     const { raw } = await this.subscribeProductRepo.upsert(
    //         { product: productId, email, sid, lang } as DeepPartial<SubscribeProductI>,
    //         {
    //             conflictPaths: { product: true, email: true },
    //             skipUpdateIfNoValuesChanged: true,
    //         },
    //     )

    //     if (raw.length === 0) throw new NotAcceptableException('this email already subscribed on this product');
    // }
}
