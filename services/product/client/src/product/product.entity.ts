import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product, ProductPrice, ProductStatus } from 'gen/product';
import ProductImageEntity from '../productImage/productImage.entity';

export class PriceEntity implements ProductPrice {
    @Column({ name: 'price_current' })
    current: number;

    @Column({ type: 'int4', name: 'price_old', nullable: true, default: null })
    old?: number;
}

@Entity('product')
export class ProductEntity implements Omit<Product, 'title' | 'description' | 'category' | 'options'> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: number;

    @Column()
    description: number;

    @Column({ default: ProductStatus.AVAILABLE_STATUS })
    status: ProductStatus;

    @Column(() => PriceEntity, { prefix: false })
    price: PriceEntity;

    @Column()
    category: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ default: 0 })
    rating: number;

    @Column({ default: true })
    isNew: boolean;

    @Column({ nullable: true, default: null })
    comment: string;

    @OneToMany(() => ProductImageEntity, ({ product }) => product, { eager: true, cascade: true })
    images: ProductImageEntity[];

    @Column('int', { array: true })
    properties: number[];
}
