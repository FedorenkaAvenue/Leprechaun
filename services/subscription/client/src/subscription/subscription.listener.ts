import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { SubscriptionService } from "./subscription.service";

@Controller()
export default class SubscriptionListener {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: any): void {
        this.subscriptionService.deleteSubscriptionByProductId(request.id);
    }
}
