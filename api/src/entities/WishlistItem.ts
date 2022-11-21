import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { WishlistItemI } from '@interfaces/WishlistItem';
import { ProductEntity } from './Product';
import { ProductI } from '@interfaces/Product';
import SessionEntity from './Session';

@Entity('wishlist_item')
export default class WishlistItemEntity implements WishlistItemI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: true })
    id: string;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    @ApiProperty({ required: true })
    product: ProductI;

    @CreateDateColumn()
    @ApiProperty({ required: true })
    created_at: Date;

    @ManyToOne(() => SessionEntity, ({ sid }) => sid, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sid', referencedColumnName: 'sid' })
    @ApiProperty()
    sid: string;
}
