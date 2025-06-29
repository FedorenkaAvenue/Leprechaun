import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import OrderItemService from "./orderItem.service";
import { Product } from "gen/product";

@Controller()
export default class OrderItemListener {
    constructor(private readonly orderItemService: OrderItemService) { }

    @EventPattern('product.deleted')
    private productDeleteListener(@Payload() request: Product): void {
        this.orderItemService.deleteOrderItemsByProductId(request.id);
    }
}
