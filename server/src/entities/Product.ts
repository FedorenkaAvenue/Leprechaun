import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { CategoryEntity } from '@entities/Category';
import { IBaseProduct, IProduct, IPublicProduct } from '@interfaces/Product';
import { ProductStatus } from '@enums/Product';
import { ImageEntity } from '@entities/Image';
import { ICategory } from '@interfaces/Category';
import { IProperty } from '@interfaces/Property';
import { PropertyEntity } from '@entities/Property';
import { PriceEntity } from './_Price';

export class BaseProductEntity implements IBaseProduct {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ required: false })
    id: string;

    @Column()
    @ApiProperty({ required: false })
    title: string;

    @Column({ default: ProductStatus.AVAILABLE })
    @ApiProperty({ enum: ProductStatus, required: false })
    status: ProductStatus;

    @Column(() => PriceEntity, { prefix: false })
    @ApiProperty({ type: PriceEntity, required: false })
    price: PriceEntity;
}

export class PublicProductEntity extends BaseProductEntity implements IPublicProduct {
    @OneToMany(
        () => ImageEntity,
        ({ product_id }) => product_id,
        { eager: true }
    )
    @ApiProperty({ type: ImageEntity, isArray: true, required: false })
    images: ImageEntity[];

    @ManyToMany(
        () => PropertyEntity,
        ({ id }) => id,
        { cascade: true }
    )
    @JoinTable({
        name: '_products_to_properties',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'property_id' }
    })
    @ApiProperty({
        type: PropertyEntity,
        required: false,
        isArray: true
    })
    properties: Array<IProperty>;

    @ManyToOne(
        () => CategoryEntity,
        ({ products }) => products,
        { onDelete: 'NO ACTION' }
    )
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    @ApiProperty({ type: () => CategoryEntity, required: false })
    category: ICategory;
}

// for admin properties
@Entity('product')
export class ProductEntity extends PublicProductEntity implements IProduct {
    @CreateDateColumn()
    @ApiProperty({ required: false })
    created_at: Date;

    @Column({ default: false })
    @ApiProperty({ required: false })
    is_public: boolean;

    @Column({ default: 0 })
    @ApiProperty({
        required: false,
        default: 0,
        description: 'product rating by sellering'
    })
    rating: number;

    @Column({ default: true })
    @ApiProperty({ required: false, description: 'novelty status' })
    is_new: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}
