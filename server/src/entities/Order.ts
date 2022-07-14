import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrderBase, IOrder, IOrderCustomerData } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemEntity } from './OrderItem';

export class OrderCustomerDataEntity implements IOrderCustomerData {
    @Column({ name: 'customer_name', nullable: true })
    @ApiProperty()
    name: string;

    @Column({ name: 'customer_phone', nullable: true })
    @ApiProperty()
    phone: string;
}

export class OrderBaseEntity implements IOrderBase {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order ID' })
    id: string;

    @Column({ default: OrderStatus.INIT })
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
}

@Entity('order')
export class OrderEntity extends OrderBaseEntity implements IOrder {
    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;
    
    @OneToMany(
        () => OrderItemEntity,
        ({ order_id }) => order_id
    )
    @ApiProperty({ type: OrderItemEntity, isArray: true })
    list: IOrderItem[];

    @Column(() => OrderCustomerDataEntity, { prefix: false })
    @ApiProperty({ description: 'customer\'s order credentials' })
    customer: IOrderCustomerData;

    @Column({ nullable: true })
    @ApiProperty({ description: 'user session ID' })
    session_id: string;
}
