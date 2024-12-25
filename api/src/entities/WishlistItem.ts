import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { WishlistItemI } from '@interfaces/WishlistItem';
import { ProductEntity } from './Product';
import WishlistEntity from './Wishlist';

@Entity('wishlist_item')
export default class WishlistItemEntity implements WishlistItemI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true })
    id: string;

    @ManyToOne(() => WishlistEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'wishlist', referencedColumnName: 'id' })
    @ApiProperty()
    wishlist: WishlistEntity;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ required: true })
    product: ProductEntity;

    @CreateDateColumn()
    @ApiProperty({ required: true })
    created_at: Date;
}
