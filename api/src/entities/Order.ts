import {
    AfterUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderI, OrderCustomerDataI } from '@interfaces/Order';
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

@Entity('order')
export class OrderEntity implements OrderI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'order ID' })
    id: string;

    @Column({ default: OrderStatus.INIT })
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty({ type: Date, description: 'date of last changed status' })
    updated_at: Date;

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
