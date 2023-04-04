import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { ProductI } from '@interfaces/Product';
import { ProductStatusE } from '@enums/Product';
import { ImageEntity } from '@entities/Image';
import { CategoryI } from '@interfaces/Category';
import { PropertyEntity } from '@entities/Property';
import { PriceEntity } from './_Price';
import WishlistItemEntity from './WishlistItem';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';
import { OptionI } from '@interfaces/PropertyGroup';

@Entity('product')
export class ProductEntity implements ProductI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'description', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity, nullable: true })
    description: TransI;

    @Column({ default: ProductStatusE.AVAILABLE })
    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @Column(() => PriceEntity, { prefix: false })
    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @OneToMany(() => ImageEntity, ({ product_id }) => product_id, { eager: true })
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

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @Column({ default: 0 })
    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    // virtual properties

    @ApiProperty({ description: 'how many users added this product to wishlist' })
    wishlistCount: WishlistItemEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)' })
    options: OptionI[];
}
