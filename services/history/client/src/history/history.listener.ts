import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { Product, ProductPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import { HistoryService } from "./history.service";

@Controller()
export default class HistoryListener {
    constructor(private readonly historyService: HistoryService) { }

    @EventPattern('user.deleted')
    private userDeleteListener(@Payload() request: User): void {
        this.historyService.clearHistory(request.id);
    }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: Product): void {
        this.historyService.removeHistoriesByProductId(request.id);
    }

    @EventPattern('product.visited')
    private historyAddListener(
        @Payload() { user, product }: { user: User['id'], product: ProductPreviewPublic },
    ): void {
        this.historyService.addHistoryItem(user, product.id);
    }
}
