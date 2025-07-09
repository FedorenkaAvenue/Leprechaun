import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { catchError, lastValueFrom, map, of, throwError } from "rxjs";
import { status } from "@grpc/grpc-js";
import {
    ORDER_ITEM_SERVICE_NAME, ORDER_SERVICE_NAME, OrderItem, OrderItemServiceClient, OrderPublic, OrderServiceClient,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/order";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

import { catchResponceError } from "@pipes/operators";
import { OrderItemCreateSchema, OrderItemUpdateSchema } from "./order.schema";
import { ORDER_PACKAGE } from "./order.constants";

@Injectable()
export default class OrderService {
    private orderClient: OrderServiceClient;
    private orderItemClient: OrderItemServiceClient;

    constructor(@Inject(ORDER_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.orderClient = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
        this.orderItemClient = this.client.getService<OrderItemServiceClient>(ORDER_ITEM_SERVICE_NAME);
    }

    public async getCartPublic(user: User['id'], queries: QueryCommonParams): Promise<OrderPublic | null> {
        return lastValueFrom(this.orderClient.getCartPublic({ user, queries }).pipe(
            map(res => res),
            catchError(err => {
                if (err.code === status.NOT_FOUND) return of(null);

                return throwError(() => err).pipe(catchResponceError);
            })
        ));
    }

    public async addOrderItemPublic(
        items: OrderItemCreateSchema[],
        user: User['id'],
        queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        return lastValueFrom(
            this.orderItemClient.createOrderItemsPublic({ items, user, queries }).pipe(catchResponceError)
        );
    }

    public async changeOrderItemAmountPublic(
        data: OrderItemUpdateSchema,
        user: User['id'],
        queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        return lastValueFrom(
            this.orderItemClient.changeOrderItemAmountPublic({ data, user, queries }).pipe(catchResponceError)
        );
    }

    public async getOderListPublic(user: User['id'], queries: QueryCommonParams): Promise<OrderPublic[]> {
        return lastValueFrom(this.orderClient.getOrderListPublic({ user, queries }).pipe(
            map(res => res.items),
            catchResponceError,
        ));
    }

    public deleteOrderItemPublic(
        id: OrderItem['id'],
        user: User['id'],
        queries: QueryCommonParams,
    ): Promise<OrderPublic> {
        return lastValueFrom(this.orderItemClient.deleteOrderItemPublic({ id, user, queries }).pipe(catchResponceError));
    }
}
