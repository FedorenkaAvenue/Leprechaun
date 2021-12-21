import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,
    OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrder } from '@interfaces/Order';
import { ProductEntity } from './Product';

@Entity('order')
export class OrderEntity implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: false })
    id: string;

    @CreateDateColumn()
    @ApiProperty({ required: false })
    created_at: Date;

    @Column()
    @ApiProperty({ description: 'product amount', required: false })
    amount: number;

    @ManyToOne(
        () => ProductEntity,
        ({ id }) => id,
        { cascade: true }
    )
    @JoinColumn({ name: 'product_id' })
    @ApiProperty({ required: false })
    product_id: string;

    @Column({ default: false })
    @ApiProperty({ required: false })
    is_bought: boolean;
}
