import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { EventHistoryProduct } from '@fedorenkaavenue/leprechaun_lib_entities/types/events';

import { GateGateway } from "./gate.gateway";

@Controller()
export default class GateListener {
    constructor(private readonly gateService: GateGateway) { }

    @EventPattern('product.visited')
    private historyAddListener(@Payload() { user, product }: EventHistoryProduct): void {
        console.log(user, product);

        this.gateService.pushToProductHistory({ user, product });
    }
}
