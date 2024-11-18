import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Not, UpdateResult } from 'typeorm';

import { SessionI } from '@interfaces/Session';
import { OrderStatus } from '@enums/Order';
import { OrderItemI } from '@interfaces/OrderItem';
import { ProductEntity } from '@entities/Product';
import OrderService from '.';
import { QueriesCommon } from '@dto/Queries/constructor';
import { CreateOrderDTO, OrderPublic } from '@dto/Order/public';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem/private';

@Injectable()
export default class OrderPublicService extends OrderService {
    public async getCart(sid: SessionI['sid'], searchParams: QueriesCommon): Promise<OrderPublic> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.sid = :sid', { sid })
            .andWhere('order.status = :status', { status: OrderStatus.INIT });

        return await this.getOrder<OrderPublic>(qb, searchParams, OrderPublic);
    }

    public async addOrderItem(
        orderItem: CreateOrderItemDTO,
        sid: SessionI['sid'],
        searchParams: QueriesCommon,
    ): Promise<OrderPublic> {
        const res = await this.orderRepo.findOneBy({
            sid,
            status: OrderStatus.INIT,
        });

        if (res) {
            // order is existed
            const { list, id } = res;

            if (list.some(({ product }) => product.id == orderItem.product)) {
                // order item already at order
                throw new BadRequestException('product already exists');
            } else {
                // add order item
                await this.orderItemRepo.save({ order_id: id, ...orderItem } as DeepPartial<ProductEntity>);
            }
        } else {
            // create new order
            const { id: order_id } = await this.createOrder(sid);

            await this.orderItemRepo.save({ order_id, ...orderItem } as DeepPartial<ProductEntity>);
        }

        return await this.getCart(sid, searchParams);
    }

    public async changeOrderItemAmount(
        id: OrderItemI['id'],
        { amount }: UpdateOrderItemDTO,
        sid: SessionI['sid'],
        searchParams: QueriesCommon,
    ): Promise<OrderPublic> {
        await this.orderItemRepo.update({ id }, { amount });

        return this.getCart(sid, searchParams);
    }

    public async postOrder({ order: { id }, customer }: CreateOrderDTO, sid: SessionI['sid']): Promise<UpdateResult> {
        const { list } = await this.orderRepo.findOneBy({ id });

        list.forEach(({ product: { id } }) => this.productService.incrementProductOrderCount(id));

        return this.orderRepo.update({ id, sid }, { status: OrderStatus.POSTED, customer });
    }

    public async getOrderList(sid: SessionI['sid'], searchParams: QueriesCommon): Promise<OrderPublic[]> {
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
        searchParams: QueriesCommon,
    ): Promise<OrderPublic> {
        await this.orderItemRepo.delete({ id });

        return this.getCart(sid, searchParams);
    }
}
