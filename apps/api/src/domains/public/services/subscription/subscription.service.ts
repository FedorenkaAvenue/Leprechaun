import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import {
    SUBSCRIPTION_SERVICE_NAME, SubscriptionServiceClient,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/subscription";
import { Empty } from "@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty";

import { SUBSCRIPTION_PACKAGE } from "./subscription.constants";
import { catchResponceError } from "@pipes/operators";
import { SubscriptionProductStatusSchema } from "./subscription.schema";
import { QueriesCommon } from "@common/queries/queries.dto";

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

    public async subscribeProductStatus(
        data: SubscriptionProductStatusSchema,
        user: User['id'],
        queries: QueriesCommon,
    ): Promise<Empty> {
        return await lastValueFrom(
            this.subscriptionClient.subscribeProductStatus({ ...data, user, queries }).pipe(catchResponceError)
        );
    }
}
