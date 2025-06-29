import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import OrderEntity from '../order/order.entity';
import { Order, OrderItem } from 'gen/order';

@Entity('order_item')
export class OrderItemEntity implements Omit<OrderItem, 'product' | 'summaryPrice'> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    product: string;

    @ManyToOne(() => OrderEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order', referencedColumnName: 'id' })
    order: Order['id'];

    @Column({ default: 1, nullable: false })
    amount: number;
}
