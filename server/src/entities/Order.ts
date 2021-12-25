import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrderBase, IOrder, OrderStatus, IOrderCustomerData } from '@interfaces/Order';
import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemEntity } from './OrderItemEntity';

export class OrderCustomerDataEntity implements IOrderCustomerData {
    @Column({ name: 'customer_name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'customer_phone', nullable: true })
    @ApiProperty({ required: false })
    phone: string;
}

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
    @ApiProperty({ type: OrderItemEntity, isArray: true })
    list?: IOrderItem[];

    @Column(() => OrderCustomerDataEntity, { prefix: false })
    @ApiProperty({ description: 'customer\'s order credentials' })
    customer?: IOrderCustomerData;

    @Column({ nullable: true })
    @ApiProperty({ description: 'user session ID' })
    session_id?: string;
}
