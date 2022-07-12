import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { IImage } from '@interfaces/Image';
import { IProduct } from '@interfaces/Product';

@Entity('image')
export class ImageEntity implements IImage {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    src: string;

    @ManyToOne(
        () => ProductEntity,
        ({ images }) => images,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    @ApiProperty({ required: false })
    product_id: IProduct['id'];
}
