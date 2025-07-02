import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import OrderItemService from "./orderItem.service";

@Controller()
export default class OrderItemListener {
    constructor(private readonly orderItemService: OrderItemService) { }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: Product): void {
        this.orderItemService.deleteOrderItemsByProductId(request.id);
    }
}
