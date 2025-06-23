import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    SubscriptionListPublic,
    SubscriptionListPublicSearchParams,
    SubscriptionServiceController,
    SubscriptionServiceControllerMethods,
} from "gen/subscription";
import { SubscriptionService } from "./subscription.service";

@Controller()
@SubscriptionServiceControllerMethods()
export default class SubscriptionController implements SubscriptionServiceController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    getSubscriptionListPublic({ user }: SubscriptionListPublicSearchParams): Observable<SubscriptionListPublic> {
        return this.subscriptionService.getSubscriptionListPublic(user).pipe(
            map(subscriptions => ({ items: subscriptions })),
        );
    }
}
