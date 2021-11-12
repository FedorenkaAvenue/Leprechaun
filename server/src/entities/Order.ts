import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IOrder } from '@interfaces/Order';
import { UserEntity } from './User';
import { ProductEntity } from './Product';

@Entity('order')
export class OrderEntity implements IOrder {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ description: 'product amount' })
    amount: number;

    @OneToOne(
        () => UserEntity,
        ({ id }) => id,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    @ApiProperty({ required: true })
    user_id: string;

    @ManyToOne(
        () => ProductEntity,
        ({ id }) => id,
        { cascade: true }
    )
    @JoinColumn({ name: 'property_group' })
    @ApiProperty()
    product_id: string;
}
