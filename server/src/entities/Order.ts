import {
    Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrder, IOrderItem, OrderStatus } from '@interfaces/Order';
import { ProductEntity } from './Product';
import { IProduct } from '@interfaces/Product';

@Entity('order')
export class OrderEntity implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: false })
    id: string;

    @CreateDateColumn()
    @ApiProperty({ required: false })
    created_at: Date;

    @Column({ default: OrderStatus.CREATED })
    @ApiProperty({ required: false, default: OrderStatus.CREATED })
    status: OrderStatus;
    
    @OneToMany(
        () => OrderEntity,
        ({ id }) => id
    )
    @ApiProperty({})
    order_items: IOrderItem[];

    @Column()
    @ApiProperty({ description: 'customer\'s order credentials' })
    customer: string;
}

@Entity('order_item')
export class OrderItemEntity implements IOrderItem {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: false })
    id: string;

    @ManyToOne(
        () => OrderEntity,
        ({ id }) => id,
        { cascade: true }
    )
    order_id: string;

    @ManyToOne(
        () => ProductEntity,
        ({ id }) => id
    )
    @ApiProperty({ required: true })
    product_id: IProduct['id'];

    @Column()
    @ApiProperty({ description: 'product amount', required: true })
    amount: number;
}
