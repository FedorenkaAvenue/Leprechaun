import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Wishlist } from 'gen/wishlist';
import WishlistItemEntity from '../wishlistItem/wishlistItem.entity';
import { User } from 'gen/user';

@Entity('wishlist')
export default class WishlistEntity implements Omit<Wishlist, 'items'> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isDefault: boolean;

    @Column({ type: 'varchar' })
    user: User['id'];

    @CreateDateColumn()
    itemsUpdatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    title: string;

    @OneToMany(() => WishlistItemEntity, ({ wishlist }) => wishlist, { eager: true })
    items: WishlistItemEntity[];
}
