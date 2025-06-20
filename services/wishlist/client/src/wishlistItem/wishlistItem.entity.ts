import {
    Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { WishlistItem } from 'gen/wishlist';
import WishlistEntity from '../wishlist/wishlist.entity';
import { Product } from 'gen/product';

@Entity('wishlist_item')
@Index('wishlist_item_UNIQUE', ['wishlist', 'product'], { unique: true })
export default class WishlistItemEntity implements Omit<WishlistItem, 'product'> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    product: Product['id'];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => WishlistEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'wishlist', referencedColumnName: 'id' })
    wishlist: WishlistEntity;
}
