import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product, ProductImage } from 'gen/product';
import { ProductEntity } from 'src/product/product.entity';

@Entity('product_image')
export default class ProductImageEntity implements ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    src: string;

    @Column({ select: false, nullable: false })
    srcId: string;

    @ManyToOne(() => ProductEntity, ({ images }) => images, { onDelete: 'CASCADE' })
    product: Product['id'];

    @Column({ default: false })
    isMain: boolean;
}
