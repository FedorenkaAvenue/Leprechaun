import {
    CreateDateColumn, DataSource, Entity, EntitySubscriberInterface, EventSubscriber, Index, InsertEvent, JoinColumn,
    ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { WishlistItemI } from './wishlistItem.interface';
import WishlistEntity from '../wishlist/wishlist.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('wishlist_item')
@Index('wishlist_item_UNIQUE', ['wishlist', 'product'], { unique: true })
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

@EventSubscriber()
export class WishlistItemSubscriber implements EntitySubscriberInterface<WishlistItemEntity> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return WishlistItemEntity;
    }

    async afterInsert(event: InsertEvent<WishlistItemEntity>) {
        // update wishlist's "items_updated_at" field after insert wishlist item
        await event.manager.getRepository(WishlistEntity).update(
            { id: event.entity.wishlist as unknown as string },
            { items_updated_at: new Date() },
        );
    }
}
