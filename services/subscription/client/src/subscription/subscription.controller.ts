import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import { ValidateRPCDTO } from "@fedorenkaavenue/leprechaun_lib_utils/decorators";
import {
    SubscriptionListPublic,
    SubscriptionListPublicSearchParams,
    SubscriptionProductStatus,
    SubscriptionServiceController,
    SubscriptionServiceControllerMethods,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/subscription";

import { SubscriptionService } from "./subscription.service";
import { SubscriptionProductStatusDTO } from "./subscription.dto";

@Controller()
@SubscriptionServiceControllerMethods()
export default class SubscriptionController implements SubscriptionServiceController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    public getSubscriptionListPublic({ user }: SubscriptionListPublicSearchParams): Observable<SubscriptionListPublic> {
        return this.subscriptionService.getSubscriptionListPublic(user).pipe(
            map(subscriptions => ({ items: subscriptions })),
        );
    }

    @ValidateRPCDTO(SubscriptionProductStatusDTO)
    public subscribeProductStatus(request: SubscriptionProductStatus): Observable<void> {
        return this.subscriptionService.subscribeProductStatus(request);
    }
}
