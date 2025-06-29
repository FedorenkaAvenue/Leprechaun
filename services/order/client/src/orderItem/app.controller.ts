import { Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    OrderPublic,
    OrderItemsPublicCreate,
    OrderItemUpdatePublic,
    OrderItemPublicDelete,
    OrderItemServiceControllerMethods,
    OrderItemServiceController,
} from "gen/order";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import OrderItemService from "./orderItem.service";
import { OrderItemPublicDeleteDTO, OrderItemsPublicCreateDTO, OrderItemUpdatePublicDTO } from "./orderItem.dto";

@Controller()
@OrderItemServiceControllerMethods()
export default class OrderItemController implements OrderItemServiceController {
    constructor(private readonly orderItemService: OrderItemService) { }

    @ValidateDTO(OrderItemsPublicCreateDTO)
    public createOrderItemsPublic({ items, user, queries }: OrderItemsPublicCreate): Observable<OrderPublic> {
        return this.orderItemService.addOrderItemsPublic(items, user, queries);
    }

    @ValidateDTO(OrderItemUpdatePublicDTO)
    public changeOrderItemAmountPublic({ data, user, queries }: OrderItemUpdatePublic): Observable<OrderPublic> {
        return this.orderItemService.changeOrderItemAmountPublic(data, user, queries);
    }

    @ValidateDTO(OrderItemPublicDeleteDTO)
    public deleteOrderItemPublic({ id, user, queries }: OrderItemPublicDelete): Observable<OrderPublic> {
        return this.orderItemService.deleteOrderItemPublic(id, user, queries);
    }
}
