import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Not, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { UpdateOrderStatusDTO, CreateOrderDTO } from '@dto/Order';
import { OrderPublic } from '@dto/Order/constructor';
import { ISession } from '@interfaces/Session';
import { IOrder, IOrderPublic } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';
import { ProductEntity } from '@entities/Product';
import { IProduct } from '@interfaces/Product';

const ORDER_RELATIONS = [ 'list', 'list.product' ];

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>
    ) {}

    // CONTROLLERS

    async getOrderById(id: IOrder['id']): Promise<IOrderPublic> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where({ id });

        return await this.getOrder(qb);
    }

    async getCurrentOrder(session_id: ISession['id']): Promise<IOrderPublic> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.session_id = :session_id', { session_id })
            .andWhere(
                'order.status = :status',
                { status: OrderStatus.INIT }
            );

        return await this.getOrder(qb);
    }

    async getOrderHistory(session_id: ISession['id']): Promise<IOrderPublic[]> {
        try {
            const res = await this.orderRepo.find({
                where: { session_id, status: Not(OrderStatus.INIT) },
                relations: ORDER_RELATIONS,
                order: { status: 'ASC' }
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublic(order));
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async addOrderItem(orderItem: CreateOrderItemDTO, session_id: ISession['id']): Promise<IOrderPublic> {
        const res = await this.orderRepo.findOne({
            where: { session_id, status: OrderStatus.INIT },
            relations: ORDER_RELATIONS
        });

        if (res) { // order is existed
            const { list, id } = res;
            
            if (list.some(({ product }) => product.id == orderItem.product)) { // order item already at order
                throw new BadRequestException('product already exists');
            } else { // add order item
                await this.orderItemRepo.save({ order_id: id, ...orderItem } as DeepPartial<ProductEntity>);
            }
        } else { // create new order
            const { id: order_id } = await this.orderRepo.save({ session_id });

            await this.orderItemRepo.save({ order_id, ...orderItem } as DeepPartial<ProductEntity>);
        }

        return await this.getCurrentOrder(session_id);
    }

    async changeOrderItemAmount(
        { order_item, amount }: UpdateOrderItemDTO,
        sessionId: ISession['id']
    ): Promise<IOrderPublic> {
        await this.orderItemRepo.update({ id: order_item }, { amount });

        return this.getCurrentOrder(sessionId);
    }

    sendOrder({ order, customer }: CreateOrderDTO): Promise<UpdateResult> {
        return this.orderRepo.update(
            { id: order.id },
            { status: OrderStatus.POSTED, customer }
        );
    }

    async removeOrderItem(
        id: IOrderItem['id'],
        sessionId: ISession['id']
    ): Promise<IOrderPublic> {
        await this.orderItemRepo.delete({ id });

        return this.getCurrentOrder(sessionId);
    }

    changeOrderStatus(
        orderId: IOrder['id'],
        { status }: UpdateOrderStatusDTO
    ): Promise<UpdateResult> {
        return this.orderRepo.update({ id: orderId }, { status });
    }

    getAdminOrders(): Promise<IOrder[]> {
        return this.orderRepo.find({
            relations: ORDER_RELATIONS
        });
    }

    async getOrdersByProductId(productId: IProduct['id']): Promise<IOrder[]> {
        return await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.list', 'list')
            .leftJoin('list.product', 'product')
            .where('product.id = :id', { id: productId })
            .getMany();
    }

    removeOrder(id: IOrder['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }

    // HELPERS

    createOrderItem(orderId: IOrder['id'], item: CreateOrderItemDTO): Promise<IOrderItem> {
        return this.orderItemRepo.save({ order_id: orderId, ...item } as DeepPartial<ProductEntity>);
    }

    /**
	 * @description split relative tables for order by query builder
	 * @param qb current query builder to continue building query
	 * @returns completed OrderPublicDTO
	 */
    async getOrder(
        qb: SelectQueryBuilder<OrderEntity>,
    ): Promise<OrderPublic> {
        const res = await qb
            .leftJoinAndSelect('order.list', 'list')
            .leftJoinAndSelect('list.product', 'product')
            .leftJoinAndSelect('product.images', 'images')
            .orderBy('list.created_at', 'ASC')
            .getOne();

            // fictive order if doesn't exists
            return new OrderPublic(res || { id: null, status: null, list: [] });
    }

    clearUselessOrders() {
        console.log(777);
    }
}
