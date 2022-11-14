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
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '@entities/Category';
import { ProductI } from '@interfaces/Product';
import { ProductStatus } from '@enums/Product';
import { ImageEntity } from '@entities/Image';
import { CategoryI } from '@interfaces/Category';
import { PropertyI } from '@interfaces/Property';
import { PropertyEntity } from '@entities/Property';
import { PriceEntity } from './_Price';

@Entity('product')
export class ProductEntity implements ProductI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    title: string;

    @Column({ default: ProductStatus.AVAILABLE })
    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

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
    properties: Array<PropertyI>;

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
}
