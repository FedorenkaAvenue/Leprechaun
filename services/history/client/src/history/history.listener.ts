import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { User } from "gen/user";
import { HistoryService } from "./history.service";
import { Product } from "gen/product";

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
}
