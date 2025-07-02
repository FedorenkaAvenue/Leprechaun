import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import {
    OrderCartPublicSearchParams,
    OrderListPublic,
    OrderListPublicSearchParams,
    OrderPublic,
    OrderServiceController,
    OrderServiceControllerMethods,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/order";

import OrderService from "./order.service";

@Controller()
@OrderServiceControllerMethods()
export default class OrderItemController implements OrderServiceController {
    constructor(private readonly orderService: OrderService) { }

    public getOrderListPublic({ user, queries }: OrderListPublicSearchParams): Observable<OrderListPublic> {
        return this.orderService.getOrderListPublic(user, queries).pipe(
            map(res => ({ items: res }))
        );
    }

    public getCartPublic({ user, queries }: OrderCartPublicSearchParams): Observable<OrderPublic> {
        return this.orderService.getCartPublic(user, queries);
    }
}
