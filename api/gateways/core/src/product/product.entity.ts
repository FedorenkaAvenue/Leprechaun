import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, DataSource, Entity, EntitySubscriberInterface, EventSubscriber, JoinColumn, JoinTable,
    ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';

import { OptionI, ProductI } from './product.interface';
import { TransEntity } from '../trans/trans.entity';
import { TransI } from '../trans/trans.interface';
import { ProductStatus } from './product.enum';
import CategoryEntity from '../category/category.entity';
import { CategoryI } from '../category/category.interface';
import { ImageEntity } from '../image/image.entity';
import { PropertyEntity } from '../property/property.entity';
import WishlistItemEntity from '../wishlistItem/wishlistItem.entity';
import SubscribeProductService from '../subscribeProduct/subscribeProduct.service';
import { PriceI } from '@shared/interfaces/price.interface';

export class PriceEntity implements PriceI {
    @Column({ name: 'price_current' })
    @ApiProperty()
    current: number;

    @Column({ type: 'int4', name: 'price_old', nullable: true, default: null })
    @ApiProperty({ nullable: true })
    old: number | null;
}

@Entity('product')
export class ProductEntity implements Omit<ProductI, 'labels' | 'wishlistCount'> {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @OneToOne(() => TransEntity, { cascade: true })
    @JoinColumn({ name: 'description', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity, nullable: true, default: null })
    description: TransI;

    @Column({ default: ProductStatus.AVAILABLE })
    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @Column(() => PriceEntity, { prefix: false })
    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ManyToOne(() => CategoryEntity, ({ products }) => products, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    @ApiProperty({ type: () => CategoryEntity })
    category: CategoryI;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @Column({ default: false })
    @ApiProperty()
    is_public: boolean;

    @Column({ default: 0 })
    @ApiProperty({ default: 0, description: 'product rating by sellering' })
    rating: number;

    @Column({ default: true })
    @ApiProperty({ description: 'novelty status' })
    is_new: boolean;

    @Column({ nullable: true, default: null })
    @ApiProperty()
    comment: string;

    @OneToMany(() => ImageEntity, ({ product_id }) => product_id)
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ManyToMany(() => PropertyEntity, ({ id }) => id, { cascade: true })
    @JoinTable({
        name: '_products_to_properties',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'property_id' },
    })
    @ApiProperty({ type: PropertyEntity, isArray: true })
    properties: PropertyEntity[];

    @Column({ default: 0, select: false })
    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    // virtual properties, maped from SQL

    @ApiProperty({ description: 'how many users added this product to wishlist' })
    wishlistCount?: WishlistItemEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)' })
    options?: OptionI[];
}

@EventSubscriber()
export class ProductEntitySubscriber implements EntitySubscriberInterface<ProductEntity> {
    constructor(
        dataSource: DataSource,
        @Inject(SubscribeProductService) public readonly subscribePublicService: SubscribeProductService,
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return ProductEntity;
    }

    async afterUpdate(event: UpdateEvent<ProductEntity>) {
        // notify user who subscribed on product's available status
        if ((event.entity as ProductEntity).status === ProductStatus.AVAILABLE) {
            const product = await event.manager.getRepository(ProductEntity).findOne({
                where: { id: (event.entity as ProductEntity).id },
                relations: { images: true },
            }) as ProductEntity;

            this.subscribePublicService.notifyProductAvailableStatus(product);
        }
    }
}
