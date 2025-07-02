import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

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
}
