import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Order, OrderItem } from '@fedorenkaavenue/leprechaun_lib_entities/server/order';

import OrderEntity from '../order/order.entity';

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
