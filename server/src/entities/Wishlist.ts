import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IWishlistItem } from '@interfaces/Wishlist';
import { ProductEntity } from './Product';
import { IProduct } from '@interfaces/Product';

@Entity('wishlist')
export default class WishlistEntity implements IWishlistItem {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true })
    id?: string;

    @CreateDateColumn()
    @ApiProperty({ required: true })
    created_at?: Date;

    @ManyToOne(
        () => ProductEntity,
        ({ images }) => images,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    @ApiProperty({ required: true })
    product: IProduct;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    session_id?: string;
}
