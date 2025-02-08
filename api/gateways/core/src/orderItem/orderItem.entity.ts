import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderItemI } from './orderItem.interface';
import { ProductEntity } from '../product/product.entity';
import OrderEntity from '../order/order.entity';
import { OrderI } from '../order/order.interface';

@Entity('order_item')
export class OrderItemEntity implements OrderItemI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE', eager: true, nullable: false, })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ type: ProductEntity, required: true })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    @ApiProperty()
    order_id: OrderI['id'];

    @Column({ default: 1, nullable: false })
    @ApiProperty({ required: true })
    amount: number;

    @UpdateDateColumn()
    @ApiProperty()
    updated_at: Date;
}
