import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/client/user";

import OrderService from "./order.service";

@Controller()
export default class OrderListener {
    constructor(private readonly orderService: OrderService) { }

    @EventPattern('user.deleted')
    private userDeleteListener(@Payload() request: User): void {
        this.orderService.deleteOrdersByUserId(request.id);
    }
}
