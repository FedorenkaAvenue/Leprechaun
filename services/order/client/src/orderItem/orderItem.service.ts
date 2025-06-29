import { Injectable } from "@nestjs/common";
import { from, Observable, of, switchMap, throwError } from "rxjs";
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import { OrderItemEntity } from "./orderItem.entity";
import { OrderItem, OrderItemsPublicCreate_Item, OrderItemUpdatePublic_Data, OrderPublic } from "gen/order";
import { User } from "gen/user";
import { QueryCommonParams } from "gen/common";
import OrderService from "../order/order.service";
import { Product } from "gen/product";
import OrderEntity from "../order/order.entity";

@Injectable()
export default class OrderItemService {
    constructor(
        @InjectRepository(OrderItemEntity) private readonly orderItemRepo: Repository<OrderItemEntity>,
        private readonly orderService: OrderService,
    ) { }

    public addOrderItemsPublic(
        orderItems: OrderItemsPublicCreate_Item[],
        user: User['id'],
        queries: QueryCommonParams,
    ): Observable<OrderPublic> {
        return from(this.orderService.getOrCreateCart(user)).pipe(
            switchMap(order => from(
                this.orderItemRepo.save(orderItems.map(item => ({ order: order.id, ...item }))))
            ),
            switchMap(() => this.orderService.getCartPublic(user, queries)),
        );
    }

    public changeOrderItemAmountPublic(
        data: OrderItemUpdatePublic_Data,
        user: User['id'],
        queries: QueryCommonParams,
    ): Observable<OrderPublic> {
        return this.checkIfOrderItemBelongsToUser(user, data.id).pipe(
            switchMap(() => from(this.orderItemRepo.update(data.id, { amount: data.amount }))),
            switchMap(() => this.orderService.getCartPublic(user, queries)),
        );
    }

    public deleteOrderItemPublic(
        id: OrderItem['id'],
        user: User['id'],
        queries: QueryCommonParams,
    ): Observable<OrderPublic> {
        return this.checkIfOrderItemBelongsToUser(user, id).pipe(
            switchMap(() => from(this.orderItemRepo.delete({ id }))),
            switchMap(() => this.orderService.getCartPublic(user, queries)),
        )
    }

    /**
     * @description for 'product.deleted' event. remove all order items by product ID
     * @param id product ID
     */
    public deleteOrderItemsByProductId(id: Product['id']): Observable<DeleteResult> {
        return from(this.orderItemRepo.delete({ product: id }));
    }

    /**
     * @description check if order item belongs to user
     * @param userId user ID
     * @param orderItemId order item ID
     */
    private checkIfOrderItemBelongsToUser(userId: User['id'], orderItemId: OrderItem['id']): Observable<void> {
        return from(this.orderItemRepo.findOne({
            where: { id: orderItemId },
            relations: ['order'],
        })).pipe(
            switchMap(orderItem => {
                if ((orderItem?.order as unknown as OrderEntity).user !== userId) {
                    return throwError(() => new RpcException({
                        code: status.PERMISSION_DENIED,
                        message: 'Order item by user not found',
                    }));
                }

                return of(void 0);
            })
        )
    };
}
