import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wishlist } from '@fedorenkaavenue/leprechaun_lib_entities/server/wishlist';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

import WishlistItemEntity from '../wishlistItem/wishlistItem.entity';

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
