import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderBaseI, OrderI, OrderCustomerDataI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { OrderItemI } from '@interfaces/OrderItem';
import { OrderItemEntity } from './OrderItem';

export class OrderCustomerDataEntity implements OrderCustomerDataI {
    @Column({ name: 'customer_name', nullable: true })
    @ApiProperty()
    name: string;

    @Column({ name: 'customer_phone', nullable: true })
    @ApiProperty()
    phone: string;
}

export class OrderBaseEntity implements OrderBaseI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order ID' })
    id: string;

    @Column({ default: OrderStatus.INIT })
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
}

@Entity('order')
export class OrderEntity extends OrderBaseEntity implements OrderI {
    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @OneToMany(() => OrderItemEntity, ({ order_id }) => order_id)
    @ApiProperty({ type: OrderItemEntity, isArray: true })
    list: OrderItemI[];

    @Column(() => OrderCustomerDataEntity, { prefix: false })
    @ApiProperty({ description: "customer's order credentials" })
    customer: OrderCustomerDataI;

    @Column({ nullable: true })
    @ApiProperty({ description: 'user session ID' })
    session_id: string;
}
