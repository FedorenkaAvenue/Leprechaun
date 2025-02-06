import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ImageI } from './image.interface';
import { ProductEntity } from '../product/product.entity';
import { ProductI } from '../product/product.interface';

@Entity('image')
export class ImageEntity implements ImageI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    src: string;

    @ManyToOne(() => ProductEntity, ({ images }) => images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    @ApiProperty()
    product_id: ProductI['id'];

    @Column({ default: false })
    @ApiProperty()
    is_main: boolean;
}
