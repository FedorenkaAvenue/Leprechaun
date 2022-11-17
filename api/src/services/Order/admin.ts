import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UpdateOrderStatusDTO } from '@dto/Order';
import { OrderI, OrderPublicI } from '@interfaces/Order';
import OrderHelperService from './helper';
import { ProductI } from '@interfaces/Product';
import { ORDER_RELATIONS } from '@constants/relations';

@Injectable()
export default class OrderAdminService extends OrderHelperService {
    async getOrderById(id: OrderI['id']): Promise<OrderPublicI> {
        const qb = this.orderRepo.createQueryBuilder('order').where({ id });

        const res = await this.getOrder(qb);

        if (res) return res;

        throw new NotFoundException('order not found');
    }

    changeOrderStatus(orderId: OrderI['id'], { status }: UpdateOrderStatusDTO): Promise<UpdateResult> {
        return this.orderRepo.update({ id: orderId }, { status });
    }

    getOrders(): Promise<OrderI[]> {
        return this.orderRepo.find({ relations: ORDER_RELATIONS });
    }

    async getOrdersByProductId(productId: ProductI['id']): Promise<OrderI[]> {
        return await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.list', 'list')
            .leftJoin('list.product', 'product')
            .where('product.id = :id', { id: productId })
            .getMany();
    }

    removeOrder(id: OrderI['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}
