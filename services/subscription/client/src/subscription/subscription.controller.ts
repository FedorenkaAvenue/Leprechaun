import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    SubscriptionListPublic,
    SubscriptionListPublicSearchParams,
    SubscriptionProductStatus,
    SubscriptionServiceController,
    SubscriptionServiceControllerMethods,
} from "gen/subscription";
import { SubscriptionService } from "./subscription.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
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

    @ValidateDTO(SubscriptionProductStatusDTO)
    public subscribeProductStatus(request: SubscriptionProductStatus): Observable<void> {
        return this.subscriptionService.subscribeProductStatus(request);
    }
}
