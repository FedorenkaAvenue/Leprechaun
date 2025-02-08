import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { WishlistI } from './wishlist.interface';
import WishlistItemEntity from '../wishlistItem/wishlistItem.entity';
import SessionEntity from '../session/session.entity';

@Entity('wishlist')
export default class WishlistEntity implements WishlistI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true })
    id: string;

    @OneToMany(() => WishlistItemEntity, ({ wishlist }) => wishlist, { eager: true })
    @ApiProperty({ type: () => WishlistItemEntity, isArray: true })
    items: WishlistItemEntity[];

    @ManyToOne(() => SessionEntity, ({ sid }) => sid, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sid', referencedColumnName: 'sid' })
    @ApiProperty()
    sid: string;

    @Column({ default: false })
    @ApiProperty({ required: false, default: false })
    isDefault: boolean;

    @ApiProperty()
    @CreateDateColumn()
    items_updated_at: Date;

    @CreateDateColumn()
    @ApiProperty({ required: true })
    created_at: Date;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    title: string;
}
