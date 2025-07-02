import { Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import { ValidateRPCDTO } from "@fedorenkaavenue/leprechaun_lib_utils/decorators";
import {
    OrderPublic,
    OrderItemsPublicCreate,
    OrderItemUpdatePublic,
    OrderItemPublicDelete,
    OrderItemServiceControllerMethods,
    OrderItemServiceController,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/order";

import OrderItemService from "./orderItem.service";
import { OrderItemPublicDeleteDTO, OrderItemsPublicCreateDTO, OrderItemUpdatePublicDTO } from "./orderItem.dto";

@Controller()
@OrderItemServiceControllerMethods()
export default class OrderItemController implements OrderItemServiceController {
    constructor(private readonly orderItemService: OrderItemService) { }

    @ValidateRPCDTO(OrderItemsPublicCreateDTO)
    public createOrderItemsPublic({ items, user, queries }: OrderItemsPublicCreate): Observable<OrderPublic> {
        return this.orderItemService.addOrderItemsPublic(items, user, queries);
    }

    @ValidateRPCDTO(OrderItemUpdatePublicDTO)
    public changeOrderItemAmountPublic({ data, user, queries }: OrderItemUpdatePublic): Observable<OrderPublic> {
        return this.orderItemService.changeOrderItemAmountPublic(data, user, queries);
    }

    @ValidateRPCDTO(OrderItemPublicDeleteDTO)
    public deleteOrderItemPublic({ id, user, queries }: OrderItemPublicDelete): Observable<OrderPublic> {
        return this.orderItemService.deleteOrderItemPublic(id, user, queries);
    }
}
