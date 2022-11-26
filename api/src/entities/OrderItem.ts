import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderI } from '@interfaces/Order';
import { ProductEntity } from './Product';
import { OrderItemI } from '@interfaces/OrderItem';
import { OrderEntity } from './Order';
import { ProductPreviewDTO } from '@dto/Product';

@Entity('order_item')
export class OrderItemEntity implements OrderItemI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order item ID', required: true })
    id: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ type: ProductPreviewDTO, required: true })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    @ApiProperty()
    order_id: OrderI['id'];

    @Column({ default: 1, nullable: false })
    @ApiProperty({ required: true })
    amount: number;
}
