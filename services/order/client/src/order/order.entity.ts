import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order, OrderStatus } from '@fedorenkaavenue/leprechaun_lib_entities/server/order';

import { OrderItemEntity } from '../orderItem/orderItem.entity';

// export class OrderCustomerDataEntity implements OrderCustomerDataI {
//     @Column({ name: 'customer_name', nullable: true })
//     name: string;

//     @Column({ name: 'customer_phone', nullable: true })
//     phone: string;
// }

@Entity('order')
export default class OrderEntity implements Omit<Order, 'items'> {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    user: string;

    @Column({ default: OrderStatus.INIT })
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderItemEntity, ({ order }) => order, { eager: true })
    items: OrderItemEntity[];

    // @Column(() => OrderCustomerDataEntity, { prefix: false })
    // customer: OrderCustomerDataI;
}
