import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UpdateOrderStatusDTO } from '@dto/Order';
import { OrderI } from '@interfaces/Order';
import OrderService from '.';
import { ProductI } from '@interfaces/Product';
import { OrderEntity } from '@entities/Order';

@Injectable()
export default class OrderPrivateService extends OrderService {
    public async getOrderById(id: OrderI['id']): Promise<OrderEntity> {
        const qb = this.orderRepo.createQueryBuilder('order').where({ id });
        const res = await this.getOrder<OrderEntity>(qb);

        if (res) return res;

        throw new NotFoundException('order not found');
    }

    public changeOrderStatus(orderId: OrderI['id'], { status }: UpdateOrderStatusDTO): Promise<UpdateResult> {
        return this.orderRepo.update({ id: orderId }, { status });
    }

    public getOrders(): Promise<OrderEntity[]> {
        return this.orderRepo.find();
    }

    public async getOrdersByProductId(productId: ProductI['id']): Promise<OrderEntity[]> {
        return await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.list', 'list')
            .leftJoin('list.product', 'product')
            .where('product.id = :id', { id: productId })
            .getMany();
    }

    public removeOrder(id: OrderI['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}
