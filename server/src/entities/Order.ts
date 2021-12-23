import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrderBase, IOrder, OrderStatus } from '@interfaces/Order';
import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemEntity } from './OrderItemEntity';

export class OrderBaseEntity implements IOrderBase {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true, description: 'order ID' })
    id?: string;

    @Column({ default: OrderStatus.CREATED })
    @ApiProperty({ required: true, enum: OrderStatus })
    status: OrderStatus;
}

@Entity('order')
export class OrderEntity extends OrderBaseEntity implements IOrder {
    @CreateDateColumn()
    @ApiProperty({ required: false })
    created_at?: Date;
    
    @OneToMany(
        () => OrderItemEntity,
        ({ order }) => order
    )
    @ApiProperty()
    list?: IOrderItem[];

    @Column({ nullable: true })
    @ApiProperty({ description: 'customer\'s order credentials' })
    customer?: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'user session ID' })
    session_id?: string;
}
