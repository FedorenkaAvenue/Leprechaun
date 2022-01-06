import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrder } from '@interfaces/Order';
import { ProductEntity } from './Product';
import { IProduct } from '@interfaces/Product';
import { IOrderItem, IOrderItemBase } from '@interfaces/OrderItem';
import { OrderEntity } from './Order';
import { ProductPreviewDTO } from '@dto/Product';

export class OrderItemBaseEntity implements IOrderItemBase {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @Column({ default: 1, nullable: false })
    @ApiProperty({ required: true })
    amount: number;
}

@Entity('order_item')
export class OrderItemEntity extends OrderItemBaseEntity implements IOrderItem {
    @ManyToOne(
        () => ProductEntity,
        ({ id }) => id
    )
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ type: ProductPreviewDTO , required: true })
    product: IProduct;

    @ManyToOne(
        () => OrderEntity,
        ({ id }) => id,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'order', referencedColumnName: 'id' })
    @ApiProperty()
    order: IOrder['id'];
}
