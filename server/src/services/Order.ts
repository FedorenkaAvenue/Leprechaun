import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItemEntity';
import { CreateOrderDTO, OrderPublicDTO } from '@dto/Order';
import { ISession } from '@interfaces/Session';
import { IOrder, IOrderPublic, OrderStatus } from '@interfaces/Order';
import { CreateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
    ) {}

    async createOrder(order: IOrder, item: CreateOrderItemDTO): Promise<void> {
        //@ts-ignore
        const { id } = await this.orderRepo.save(order);
        
        //@ts-ignore
        await this.orderItemRepo.save({ order: id, ...item });
    }

    async getCurrentOrder(session_id: ISession['id']): Promise<IOrderPublic> {
        try {
            const res = await this.orderRepo
                .createQueryBuilder('order')
                .where('order.session_id = :session_id', { session_id })
                .andWhere(
                    'order.status IN (:...statuses)',
                    { statuses: [ OrderStatus.CREATED, OrderStatus.IN_PROCESS ] }
                )
                .leftJoinAndSelect('order.list', 'list')
                .leftJoinAndSelect('list.product', 'product')
                .leftJoinAndSelect('product.images', 'images')
                .getOneOrFail();

            return new OrderPublicDTO(res);
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async getOrderHistory(session_id: ISession['id']): Promise<IOrderPublic[]> {
        try {
            const res = await this.orderRepo.find({
                where: { session_id, status: OrderStatus.COMPLETED },
                relations: [ 'list', 'list.product' ]
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublicDTO(order));
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async addOrderItem(orderItem: CreateOrderItemDTO, session_id: ISession['id']) {
        const res = await this.orderRepo.findOne({
            where: { session_id, status: OrderStatus.CREATED },
            relations: ['list', 'list.product']
        });

        if (res) { // order is existed
            const { list, id } = res;
            
            if (list.some(({ product }) => product.id == orderItem.product)) { // order item already at order
                throw new BadRequestException('product already exists');
            } else {
                //@ts-ignore
                this.orderItemRepo.save({ order: id, ...orderItem });
            }
            
        } else { // create new order
            await this.createOrder({ session_id }, orderItem);
        }
    }

    changeOrderItemAmount({ product, amount }: CreateOrderItemDTO): Promise<UpdateResult> {
        return this.orderItemRepo.update({ id: product }, { amount });
    }

    postOrder({ id, customer }: CreateOrderDTO): Promise<UpdateResult> {
        return this.orderRepo.update(
            { id },
            { status: OrderStatus.POSTED, customer: JSON.stringify(customer) }
        );
    }

    removeOrderItem(id: IOrderItem['id']): Promise<DeleteResult> {
        return this.orderItemRepo.delete({ id });
    }

    removeOrder(id: IOrder['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}
