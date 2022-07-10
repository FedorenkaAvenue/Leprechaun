import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { UpdateOrderStatusDTO, CreateOrderDTO, OrderPublicDTO } from '@dto/Order';
import { ISession } from '@interfaces/Session';
import { IOrder, IOrderPublic } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>
    ) {}

    // CONTROLLERS

    async createOrder(order: IOrder): Promise<IOrder> {
        return this.orderRepo.save(order);
    }

    createOrderItem(orderId: IOrder['id'], item: CreateOrderItemDTO): Promise<IOrderItem> {
        //@ts-ignore
        return this.orderItemRepo.save({ order: orderId, ...item });
    }

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
                relations: [ 'list', 'list.product' ],
                order: { status: 'ASC' }
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublicDTO(order));
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async addOrderItem(orderItem: CreateOrderItemDTO, session_id: ISession['id']): Promise<IOrderPublic> {
        const res = await this.orderRepo.findOne({
            where: { session_id, status: OrderStatus.INIT },
            relations: ['list', 'list.product']
        });

        if (res) { // order is existed
            const { list, id } = res;
            
            if (list.some(({ product }) => product.id == orderItem.product)) { // order item already at order
                throw new BadRequestException('product already exists');
            } else {
                //@ts-ignore
                await this.orderItemRepo.save({ order: id, ...orderItem });
            }
        } else { // create new order
            const { id } = await this.createOrder({ session_id });
            await this.createOrderItem(id, orderItem);
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
            relations: ['list', 'list.product']
        });
    }

    removeOrder(id: IOrder['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }

    clearUselessOrders() {
        console.log(777);
    }

    // HELPERS

    /**
	 * @description split relative tables for order by query builder
	 * @param qb current query builder to continue building query
	 * @returns completed OrderPublicDTO
	 */
    async getOrder(
        qb: SelectQueryBuilder<OrderEntity>,
    ): Promise<OrderPublicDTO> {
        const res = await qb
            .leftJoinAndSelect('order.list', 'list')
            .leftJoinAndSelect('list.product', 'product')
            .leftJoinAndSelect('product.images', 'images')
            .orderBy('list.created_at', 'ASC')
            .getOne();

            // fictive order if doesn't exists
            return new OrderPublicDTO(res || { id: null, status: null, list: [] });
    }
}
