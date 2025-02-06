import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Not, Repository, UpdateResult } from 'typeorm';

import { OrderPublicI } from './order.interface';
import { CreateOrderDTO, OrderPublic } from './order.dto';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../orderItem/orderItem.dto';
import OrderEntity from '@core/order/order.entity';
import { SessionI } from '@core/session/session.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { OrderStatus } from '@core/order/order.enum';
import { OrderItemEntity } from '@core/orderItem/orderItem.entity';
import { OrderItemI } from '@core/orderItem/orderItem.interface';
import OrderCoreService from '@core/order/order.service';

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
        private readonly orderCoreService: OrderCoreService,
    ) { }

    public async getCart(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<OrderPublicI | null> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.sid = :sid', { sid })
            .andWhere('order.status = :status', { status: OrderStatus.INIT });

        return await this.orderCoreService.getOrder<OrderPublic>(qb, searchParams, OrderPublic);
    }

    public async addOrderItems(
        orderItems: CreateOrderItemDTO[],
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        const res = await this.orderRepo.findOneBy({ sid, status: OrderStatus.INIT });

        if (res) { // order is existed
            const filteredItems = orderItems.filter(
                ({ product }) => !res.items.find(({ product: { id } }) => id === product)
            );

            await this.orderItemRepo.save(filteredItems.map(i => ({ order_id: res.id, ...i }) as DeepPartial<OrderItemEntity>));
        } else { // create new order
            const { id: order_id } = await this.orderCoreService.createOrder(sid);
            const mapedOrderItems = orderItems.map(o => ({ order_id, ...o }));

            await this.orderItemRepo.save(mapedOrderItems as DeepPartial<OrderItemEntity[]>);
        }

        return await this.getCart(sid, searchParams);
    }

    public async changeOrderItemAmount(
        id: OrderItemI['id'],
        { amount }: UpdateOrderItemDTO,
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        await this.orderItemRepo.update({ id }, { amount });

        return this.getCart(sid, searchParams);
    }

    public async postOrder({ order: { id }, customer }: CreateOrderDTO, sid: SessionI['sid']): Promise<UpdateResult> {
        return this.orderRepo.update({ id, sid }, { status: OrderStatus.POSTED, customer });
    }

    public async getOrderList(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<OrderPublicI[]> {
        try {
            const res = await this.orderRepo.find({
                where: { sid, status: Not(OrderStatus.INIT) },
                order: { updated_at: 'DESC' },
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublic(order, searchParams));
        } catch (err) {
            throw new NotFoundException('no any active order');
        }
    }

    public async removeOrderItem(
        id: OrderItemI['id'],
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        await this.orderItemRepo.delete({ id });

        return this.getCart(sid, searchParams);
    }
}
