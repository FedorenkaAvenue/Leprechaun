import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { ImageI } from '@interfaces/Image';
import { ProductI } from '@interfaces/Product';

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
}
