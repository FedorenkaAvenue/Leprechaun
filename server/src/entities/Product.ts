import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { CategoryEntity } from '@entities/Category';
import { IBaseProduct, IProduct, IPublicProduct, ProductStatus } from '@interfaces/Product';
import { ImageEntity } from '@entities/Image';
import { ICategory } from '@interfaces/Category';
import { LabelEntity } from '@entities/Label';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';
import { PropertyEntity } from '@entities/Property';
import { IImage } from '@src/interfaces/Image';

// for preview and base properties
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

    @Column()
    @ApiProperty({ required: false })
    price: number;
}

export class PublicProductEntity extends BaseProductEntity implements IPublicProduct {
    @OneToMany(
        () => ImageEntity,
        ({ product_id }) => product_id,
        { eager: true }
    )
    @ApiProperty({ type: ImageEntity, isArray: true, required: false })
    images: IImage[];

    @ManyToMany(
        () => LabelEntity,
        { cascade: true }
    )
    @JoinTable({
        name: '_products_to_labels',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'label_id',
            referencedColumnName: 'id'
        }
    })
    @ApiProperty({
        type: LabelEntity,
        required: false,
        isArray: true
    })
    labels: ILabel[];

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

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}
