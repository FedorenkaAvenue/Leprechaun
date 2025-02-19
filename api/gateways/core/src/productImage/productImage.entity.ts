import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImageI } from './productImage.interface';
import { ProductEntity } from '../product/product.entity';
import { ProductI } from '../product/product.interface';

@Entity('product_image')
export default class ProductImageEntity implements ProductImageI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    src: string;

    @Column({ select: false, nullable: false })
    @ApiProperty({ description: '3S file id' })
    src_id: string;

    @ManyToOne(() => ProductEntity, ({ images }) => images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    @ApiProperty()
    product_id: ProductI['id'];

    @Column({ default: false })
    @ApiProperty()
    is_main: boolean;
}
