import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrder } from '@interfaces/Order';
import { ProductEntity } from './Product';
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
    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ type: ProductPreviewDTO, required: true })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    @ApiProperty()
    order_id: IOrder['id'];
}
