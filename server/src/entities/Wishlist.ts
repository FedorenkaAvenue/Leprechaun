import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IWishlistItem } from '@interfaces/Wishlist';
import { ProductEntity } from './Product';

@Entity('wishlist')
export default class WishlistEntity implements IWishlistItem {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true })
    id: string;

    @ManyToOne(
        () => ProductEntity,
        ({ images }) => images,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ required: true })
    product: ProductEntity;

    @CreateDateColumn()
    @ApiProperty({ required: true })
    created_at: Date;

    @Column({ nullable: true })
    @ApiProperty()
    session_id: string;
}
