import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, FindOptionsWhere, Not, Repository } from 'typeorm';
import { from, Observable, of, switchMap } from "rxjs";
import { status } from "@grpc/grpc-js";
import { RpcException } from "@nestjs/microservices";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/client/user";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { OrderPublic, OrderStatus } from "@fedorenkaavenue/leprechaun_lib_entities/server/order";

import OrderEntity from "./order.entity";
import ProductService from "@common/product/product.service";
import OrderMapper from "./order.mapper";

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderEntity>,
        private readonly productService: ProductService,
    ) { }

    public getCartPublic(user: User['id'], queries: QueryCommonParams): Observable<OrderPublic> {
        return this.getOrderPublic({ user, status: OrderStatus.INIT }, queries);
    }

    public getOrCreateCart(user: User['id']): Observable<OrderEntity> {
        return from(this.orderRepo.findOneBy({ user, status: OrderStatus.INIT })).pipe(
            switchMap(order => order
                ? of(order)
                : from(this.orderRepo.save({ user, status: OrderStatus.INIT }))
            )
        )
    }

    // public async postOrder({ order: { id }, customer }: CreateOrderDTO, sid: SessionI['sid']): Promise<UpdateResult> {
    //     return this.orderRepo.update({ id, sid }, { status: OrderStatus.POSTED, customer });
    // }

    public getOrderListPublic(user: User['id'], queries: QueryCommonParams): Observable<OrderPublic[]> {
        return from(this.orderRepo.find({
            where: { user, status: Not(OrderStatus.INIT) },
            order: { updatedAt: 'DESC' },
        })).pipe(
            switchMap(orders => {
                const productList = orders.map(order => order.items.map(item => item.product)).flat();

                return this.productService.getProductListByIdsPublic(productList, queries).pipe(
                    switchMap(productList => of(orders.map(order => OrderMapper.toViewPublic(order, productList))))
                );
            }),
        );
    }

    private getOrderPublic(
        options: FindOptionsWhere<OrderEntity>,
        queries: QueryCommonParams,
    ): Observable<OrderPublic> {
        return from(this.orderRepo.findOneBy(options)).pipe(
            switchMap((order) => {
                if (!order) throw new RpcException({ code: status.NOT_FOUND, message: `order not found` });

                const orderItemProductList$ = order.items.length
                    ? this.productService.getProductListByIdsPublic(order.items.map(item => item.product), queries)
                    : of([]);

                return orderItemProductList$.pipe(
                    switchMap(productList => of(OrderMapper.toViewPublic(order, productList))),
                );
            }),
        );
    }

    /**
     * @description for 'user.deleted' event. remove all user's orders
     * @param user user ID
     */
    public deleteOrdersByUserId(user: User['id']): Observable<DeleteResult> {
        return from(this.orderRepo.delete({ user }));
    }
}
