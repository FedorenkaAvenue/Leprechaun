import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductEntity } from "@modules/product/index.entity";
import { IImage } from "./index.interface";

@Entity('image')
export class ImageEntity implements IImage<string> {
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
    @JoinColumn({ name: "product", referencedColumnName: 'id' })
    @ApiProperty({ required: false })
    product: string;
}
